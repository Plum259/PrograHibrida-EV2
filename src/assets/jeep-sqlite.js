import { p as promiseResolve, b as bootstrapLazy } from './index-ffc65f19.js';
export { s as setNonce } from './index-ffc65f19.js';

/*
 Stencil Client Patch Browser v4.9.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["jeep-sqlite",[[1,"jeep-sqlite",{"autoSave":[516,"autosave"],"typeOrm":[516,"typeorm"],"wasmPath":[513,"wasmpath"],"pickText":[513,"picktext"],"saveText":[513,"savetext"],"buttonOptions":[513,"buttonoptions"],"innerAutoSave":[32],"innerTypeOrm":[32],"innerWasmPath":[32],"innerPickText":[32],"innerSaveText":[32],"innerButtonOptions":[32],"echo":[64],"createConnection":[64],"isConnection":[64],"closeConnection":[64],"open":[64],"close":[64],"getVersion":[64],"beginTransaction":[64],"commitTransaction":[64],"rollbackTransaction":[64],"isTransactionActive":[64],"execute":[64],"executeSet":[64],"run":[64],"query":[64],"getTableList":[64],"isDBExists":[64],"isDBOpen":[64],"deleteDatabase":[64],"isStoreOpen":[64],"copyFromAssets":[64],"isTableExists":[64],"createSyncTable":[64],"getSyncDate":[64],"setSyncDate":[64],"isJsonValid":[64],"importFromJson":[64],"exportToJson":[64],"deleteExportedRows":[64],"addUpgradeStatement":[64],"isDatabase":[64],"getDatabaseList":[64],"checkConnectionsConsistency":[64],"saveToStore":[64],"saveToLocalDisk":[64],"getFromLocalDiskToStore":[64],"getFromHTTPRequest":[64]},null,{"autoSave":["parseAutoSave"],"typeOrm":["parseTypeOrm"],"wasmPath":["parseWasmPath"],"pickText":["parsePickText"],"saveText":["parseSaveText"],"buttonOptions":["parseButtonOptions"]}]]]], options);
});

//# sourceMappingURL=jeep-sqlite.js.map