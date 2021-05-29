SELECT polls.name as question
       options.title as options,
       sum(votes.rank) as rank
  FROM polls
  JOIN options ON options.poll_id = polls.id
  JOIN votes ON votes.option_id = options.id
 WHERE polls.id = 6
GROUP BY polls.name, options.title
ORDER BY sum(votes.rank);
