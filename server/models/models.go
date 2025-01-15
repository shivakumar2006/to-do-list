package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ToDoList struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omniempty"`
	Task   string             `json:"task,omitempty"`
	Status bool               `jaon:"status,omitempty"`
}
