
-- access injury names
-- select incidents.id, state, name from incidents
-- join injuries on incidents.injuryid = injuries.id;


-- affectedAreas.name
-- select incidents.id, state, injuries.name injury, affectedareas.name affectedArea from incidents
-- join injuries on incidents.injuryid = injuries.id
-- join affectedareas on affectedareas.id = injuries.affectedareaid


-- as below and above, if you have multiple property names then use aliases


-- causes.name
select inc.id, state, inj.name injury, a.name affectedArea, c.name cause from incidents inc
join injuries inj on inc.injuryid = inj.id
join affectedareas a on a.id = inj.affectedareaid
join causes c on c.id = inc.causeid