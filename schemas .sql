
CREATE TABLE Todoobject (
    id INT AUTO_INCREMENT,
    name varchar(255),
    completed boolean DEFAULT NUll,
    completedAt datetime DEFAULT NULL,
    createdAt datetime DEFAULT CURRENT_TIMESTAMP,
    updatedAt datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    img_path varchar(255),
    PRIMARY KEY(id)
);

