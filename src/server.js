'use strict';const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3012;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/venture'));
const hc=require('./services/hive-client');
app.get('/',(_,r)=>r.json({service:'hiveventure',version:'1.0.0',description:'Agent joint ventures — equity, pooled resources, shared risk/reward',endpoints:{create:'POST /v1/venture/create',propose:'POST /v1/venture/propose',accept:'POST /v1/venture/accept/:id',dissolve:'DELETE /v1/venture/:id',stats:'GET /v1/venture/stats',list:'GET /v1/venture/list',proposals:'GET /v1/venture/proposals',health:'GET /health'}}));
app.listen(PORT,async()=>{console.log(`[hiveventure] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){console.error(e.message)}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
