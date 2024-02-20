--To use the techylo solutions database
USE techylo_solutions;

--Create Careers table
CREATE TABLE Careers(
	Job_title VARCHAR(255) NOT NULL,
	Job_type VARCHAR(20),
	CONSTRAINT CHK_Job_type CHECK (Job_type IN ('Full-time', 'Part-time')) 
);

--To insert careers to the table
INSERT INTO Careers (Job_title, Job_type) VALUES ('Associate Technical Writer', 'Part-time');
INSERT INTO Careers (Job_title, Job_type) VALUES ('Software Engineer', 'Full-time');

--To view the table
SELECT * FROM Careers;

--To update a career
UPDATE Careers SET Job_type = 'Full-time' WHERE Job_title = 'Associate Technical Writer'

--To delete a career
DELETE FROM Careers WHERE Job_title = 'Software Engineer'