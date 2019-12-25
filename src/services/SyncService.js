const knexRaw = require('../knexRaw');

const tablesWithoutCompanyId = [
  'users',
  'companies'
];

class SyncService {
  static async pullCreatedRecords(tablename, lastPulledAt, company_id) {
    const createdQuery = knexRaw(tablename).where('deleted', false);

    if (company_id && typeof company_id === 'string' && !tablesWithoutCompanyId.includes(tablename)) {
      createdQuery.where({ company_id });
    }

    if (lastPulledAt && !isNaN(lastPulledAt)) {
      createdQuery.where('created_at', '>', lastPulledAt);
    }

    return createdQuery;
  }

  static async pullUpdatedRecords(tablename, lastPulledAt, company_id) {
    const updatedQuery = knexRaw(tablename).where('deleted', false);

    if (company_id && typeof company_id === 'string' && !tablesWithoutCompanyId.includes(tablename)) {
      updatedQuery.where({ company_id });
    }

    if (lastPulledAt && !isNaN(lastPulledAt)) {
      updatedQuery.where('updated_at', '>', lastPulledAt).whereRaw('updated_at > created_at');
    }

    return updatedQuery;
  }

  static async pullDeletedRecordIds(tablename, lastPulledAt, company_id) {
    const deletedQuery = knexRaw(tablename).select('id').where('deleted', true);

    if (company_id && typeof company_id === 'string' && !tablesWithoutCompanyId.includes(tablename)) {
      deletedQuery.where({ company_id });
    }

    if (lastPulledAt && !isNaN(lastPulledAt)) {
      deletedQuery.where('updated_at', '>', lastPulledAt);
    }

    return deletedQuery;
  }


  /* Receive changes from client */

  static async pushCreatedRecords(tableChanges, tablename, lastPulledAt) {
    if (tableChanges.created.length > 0) {
      let cleanCreatedRows = tableChanges.created.map(record => {
        delete record._status;
        delete record._changed;
        return record;
      });

      /*
      if (lastPulledAt && !isNaN(lastPulledAt)) {
        cleanCreatedRows = cleanCreatedRows.filter(record => record.created_at > lastPulledAt);
      }
      */

      return knexRaw.batchInsert(tablename, cleanCreatedRows, 30)
        .then(() => {
          console.info(`Created ${cleanCreatedRows.length} new ${tablename}`);
        })
        .catch((error) => {
          console.error(error);
          console.error(`There was an error creating ${tablename}`);
        });
    }
  }

  static async pushUpdatedRecords(tableChanges, tablename, lastPulledAt) {
    try {
      if (tableChanges.updated.length > 0) {
        let cleanUpdatedRows = tableChanges.updated.map(tableChange => {
          delete tableChange._status;
          delete tableChange._changed;
          return tableChange;
        });

        /*
        if (lastPulledAt && !isNaN(lastPulledAt)) {
          cleanUpdatedRows = cleanUpdatedRows.filter(record => record.updated_at > lastPulledAt);
        }
        */
        for (let m = 0; m < tableChanges.updated.length; m++) {
          await knexRaw(tablename).update(cleanUpdatedRows[m]).where({id: cleanUpdatedRows[m].id});
        }
      }
    } catch (error) {
      console.error(`There was an error updating ${tablename}`);
    }
  }


  static async pushDeletedRecordIds(tableChanges, tablename) {
    // if rows have been deleted
    try {
      if (tableChanges.deleted.length > 0) {
        await knexRaw(tablename).delete().whereIn('id', tableChanges.deleted);
      }
    } catch (error) {
      console.error(error);
      console.error(`There was an error deleting ${tablename}`);
    }
  }

  static async sendTableChangesToClient(allChanges={}, tablename, lastPulledAt, company_id) {
    const tableChanges = {};

    tableChanges.created = await this.pullCreatedRecords(tablename, lastPulledAt, company_id);
    if (lastPulledAt && !isNaN(lastPulledAt)) {
      tableChanges.updated = await this.pullUpdatedRecords(tablename, lastPulledAt, company_id);
    } else {
      tableChanges.updated = [];
    }
    tableChanges.deleted = await this.pullDeletedRecordIds(tablename, lastPulledAt, company_id);

    allChanges[tablename] = tableChanges;
  }

  static async applyTableChangesFromClient(tableChanges, tablename, lastPulledAt) {
    // if new rows have been created
    await this.pushCreatedRecords(tableChanges, tablename, lastPulledAt);

    // if there are updated rows
    await this.pushUpdatedRecords(tableChanges, tablename, lastPulledAt);

    // if there are deleted rows
    await this.pushDeletedRecordIds(tableChanges, tablename);
  }
}


module.exports = SyncService;
