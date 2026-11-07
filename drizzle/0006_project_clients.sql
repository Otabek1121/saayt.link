CREATE TABLE project_clients (
 project_id TEXT NOT NULL REFERENCES projects(id),
 email TEXT NOT NULL,
 created TEXT NOT NULL,
 PRIMARY KEY(project_id,email)
);
ALTER TABLE media ADD project_id TEXT REFERENCES projects(id);
