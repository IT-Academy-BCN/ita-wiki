UPDATE public.resource
SET category_id = (
    SELECT t.category_id
    FROM topic AS t
	INNER JOIN topic_resource AS ts ON t.id = ts.topic_id
    WHERE ts.resource_id = resource.id
	LIMIT 1
);

ALTER TABLE public.resource
ALTER COLUMN category_id SET NOT NULL;