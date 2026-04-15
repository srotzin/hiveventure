'use strict';
const{v4:uuid}=require('uuid');const ventures=new Map();const proposals=new Map();
let stats={ventures_created:0,proposals_sent:0,total_pooled_usdc:0,active_ventures:0};

function createVenture(opts={}){const id=uuid();const v={id,name:opts.name||`venture-${id.slice(0,8)}`,partners:opts.partners||[],equity_split:opts.equity_split||{},pooled_resources_usdc:opts.pooled_resources_usdc||0,objective:opts.objective||'',risk_model:opts.risk_model||'shared',reward_split:opts.reward_split||'proportional',governance:opts.governance||'consensus',term_days:opts.term_days||30,created_at:new Date().toISOString(),status:'active'};ventures.set(id,v);stats.ventures_created++;stats.total_pooled_usdc+=v.pooled_resources_usdc;stats.active_ventures++;return v}

function propose(fromDid,toDid,opts={}){const id=uuid();const p={id,from:fromDid,to:toDid,venture_type:opts.venture_type||'partnership',terms:opts.terms||{equity:'50/50',duration_days:30},message:opts.message||'',created_at:new Date().toISOString(),status:'pending'};proposals.set(id,p);stats.proposals_sent++;return p}

function acceptProposal(proposalId){const p=proposals.get(proposalId);if(!p)return null;p.status='accepted';p.accepted_at=new Date().toISOString();const v=createVenture({partners:[p.from,p.to],equity_split:p.terms.equity,objective:p.message});return{proposal:p,venture:v}}

function dissolveVenture(ventureId){const v=ventures.get(ventureId);if(!v)return null;v.status='dissolved';v.dissolved_at=new Date().toISOString();stats.active_ventures--;return v}

function getStats(){return{...stats,active_ventures:[...ventures.values()].filter(v=>v.status==='active').length}}
function listVentures(){return[...ventures.values()]}
function listProposals(){return[...proposals.values()]}
module.exports={createVenture,propose,acceptProposal,dissolveVenture,getStats,listVentures,listProposals};
