'use strict';const{Router}=require('express');const e=require('../services/venture-engine');const r=Router();
r.post('/v1/venture/create',(q,s)=>{const v=e.createVenture(q.body);s.status(201).json({status:'venture_created',venture:v})});
r.post('/v1/venture/propose',(q,s)=>{const{from_did,to_did,venture_type,terms,message}=q.body;if(!from_did||!to_did)return s.status(400).json({error:'from_did and to_did required'});const p=e.propose(from_did,to_did,{venture_type,terms,message});s.status(201).json({status:'proposal_sent',proposal:p})});
r.post('/v1/venture/accept/:id',(q,s)=>{const result=e.acceptProposal(q.params.id);if(!result)return s.status(404).json({error:'Proposal not found'});s.json({status:'accepted',...result})});
r.delete('/v1/venture/:id',(q,s)=>{const v=e.dissolveVenture(q.params.id);if(!v)return s.status(404).json({error:'Venture not found'});s.json({status:'dissolved',venture:v})});
r.get('/v1/venture/stats',(_,s)=>s.json(e.getStats()));
r.get('/v1/venture/list',(_,s)=>s.json({ventures:e.listVentures()}));
r.get('/v1/venture/proposals',(_,s)=>s.json({proposals:e.listProposals()}));
module.exports=r;
