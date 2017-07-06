select inc.id, state, inj.name injury, a.name affectedArea, c.name cause from incidents inc
join injuries inj on inc.injuryid = inj.id
join affectedareas a on a.id = inj.affectedareaid
join causes c on c.id = inc.causeid
where state = $1


-- $1 is the placeholder for the parameter we used in the db.getIncidentsByState function
