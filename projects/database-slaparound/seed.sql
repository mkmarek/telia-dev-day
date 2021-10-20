INSERT INTO "manufacturer" ("name", "description")
VALUES ('Culture', 'The Culture is a society formed by various humanoid species and artificial intelligences. Since the majority of its biological population can have almost anything they want without the need to work, there is little need for laws or enforcement. It features a post-scarcity economy, where technology is advanced to such a degree that all production is automated. Its members live mainly in spaceships and other off-planet constructs, because its founders wished to avoid the centralised political and corporate power-structures that planet-based economies foster. Most of the planning and administration is done by Minds, very advanced AIs.');

--1
INSERT INTO "category" ("name", "description", "parent_id")
VALUES ('General Systems Vehicle', 'Mobile habitats and factory ships, largest and most capable Culture ship type. Build and host other ships, including smaller Systems Vehicles. May be home to billions of people. Some militarised and used as giant warships during the Idiran–Culture War. They are described in the books as holograms of the whole Culture, each one containing all the knowledge and productive capacity needed to reconstruct the civilization in case of catastrophe.', NULL);

--2
INSERT INTO "category" ("name", "description", "parent_id")
VALUES ('Medium Systems Vehicle', 'Smaller versions of GSV. Sometimes former GSVs downgraded as larger GSV classes were developed.', NULL);

--3
INSERT INTO "category" ("name", "description", "parent_id")
VALUES ('Limited Systems Vehicle', 'Smaller versions of MSVs. Sometimes former GSVs or MSVs downgraded as larger GSV classes were developed.', NULL);

--4
INSERT INTO "category" ("name", "description", "parent_id")
VALUES ('General Contact Vehicle', 'Contact craft intermediate in size and function between Systems Vehicles and Contact Units. Capabilities include building other ships.', NULL);

--5
INSERT INTO "category" ("name", "description", "parent_id")
VALUES ('General Contact Unit', 'Standard Contact craft, used for exploration and for studying and interacting with other societies. Considerable combat capability, but less than dedicated warships. At the beginning of the Idiran–Culture War GCU craft were the primary offensive unit until Culture ship building moved to a war footing.', NULL);

--6
INSERT INTO "category" ("name", "description", "parent_id")
VALUES ('Limited Contact Unit', 'Smaller, less capable versions of GCUs.', NULL);

--7
INSERT INTO "category" ("name", "description", "parent_id")
VALUES ('Rapid Offensive Unit', 'Dedicated fast warships.', NULL);

--8
INSERT INTO "category" ("name", "description", "parent_id")
VALUES ('General Offensive Unit', 'Dedicated warships.', NULL);

--9
INSERT INTO "category" ("name", "description", "parent_id")
VALUES ('Limited Offensive Unit', '', NULL);


INSERT INTO "product" ("name", "description", "category_id", "manufacturer_id")
VALUES ('Bora Horza Gobuchul', 'General Systems Vehicle (GSV) inspired by the man who discovered a conspiracy on Heibohre.', '1', '1');

INSERT INTO "product" ("name", "description", "category_id", "manufacturer_id")
VALUES ('Determinist', NULL, '1', '1');

INSERT INTO "product" ("name", "description", "category_id", "manufacturer_id")
VALUES ('Nervous Energy', 'a General Contact Unit (GCU) culture ships', '5', '1');

INSERT INTO "product" ("name", "description", "category_id", "manufacturer_id")
VALUES ('No More Mr. Nice Guy', 'A GSV ship', '1', '1');

INSERT INTO "product" ("name", "description", "category_id", "manufacturer_id")
VALUES ('Profit Margin', 'A Limited Systems Vehicle (LSV).', '3', '1');

INSERT INTO "product" ("name", "description", "category_id", "manufacturer_id")
VALUES ('Prosthetic Conscience', 'A GCU. Also a SpaceX drone ship.', '5', '1');

INSERT INTO "product" ("name", "description", "category_id", "manufacturer_id")
VALUES ('The Ends Of Invention', 'ex-Culture GSV culture ship.', '1', '1');

INSERT INTO "product" ("name", "description", "category_id", "manufacturer_id")
VALUES ('Just Read The Instructions', 'well you will have to read the instructions to ride a GCU.', '5', '1');

INSERT INTO "product" ("name", "description", "category_id", "manufacturer_id")
VALUES ('Little Rascal', 'A GSV', '1', '1');

INSERT INTO "product" ("name", "description", "category_id", "manufacturer_id")
VALUES ('Gunboat Diplomat', 'Limited Offensive Unit (LOU).', '9', '1');
