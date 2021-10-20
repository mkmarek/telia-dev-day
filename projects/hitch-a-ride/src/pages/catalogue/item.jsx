import React from "react";
import nebula from "../../../media/nebula.jpg";
import { Card, Button, Text } from "@arwes/core";
import { useHistory } from "react-router-dom";

export default function Item({ id, name, description, categoryByCategoryId }) {
  const history = useHistory();

  return (
    <Card
      className="catalogue__item"
      animator={{ activate: true }}
      image={{
        src: nebula,
        alt: name,
      }}
      title={name}
      options={
        <Button onClick={(event) => history.push(`/reservation/${id}`)} palette="secondary">
          <Text>Reserve</Text>
        </Button>
      }
      style={{ maxWidth: 400 }}
    >
      <strong><Text>Category: {categoryByCategoryId.name}</Text></strong>
      <br />
      <br />
      <Text>
        {description}
      </Text>
    </Card>
  );
}
