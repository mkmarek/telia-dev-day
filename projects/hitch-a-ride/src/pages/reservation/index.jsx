import React, { useState } from "react";
import { FrameCorners, Button, Text, LoadingBars, FrameLines } from "@arwes/core";
import { useHistory, useParams } from "react-router-dom";
import { useQuery, useMutation, gql } from "@apollo/client";

import "./styles.css";

const query = gql`
  query product($productId: Int!) {
    productById(id: $productId) {
      id
      name
      description
    }
  }
`;

const createOrder = gql`
  mutation createOrder {
    createUserOrder(input: { userOrder: {} }) {
      userOrder {
        id
      }
    }
  }
`;

const addToOrder = gql`
  mutation addToOrder($orderId: UUID!, $productId: Int!) {
    createOrderItem(
      input: { orderItem: { orderId: $orderId, productId: $productId } }
    ) {
      orderItem {
        orderId
        productId
      }
    }
  }
`;

export default function Reservation() {
  const history = useHistory();
  const { id } = useParams();
  const [resultOrderId, setResultOrderId] = useState(false);

  const { data, loading, error } = useQuery(query, {
    variables: { productId: Number(id) },
  });

  const [createOrderMutation] = useMutation(createOrder);
  const [addToOrderMutation] = useMutation(addToOrder);

  async function reserve() {
    const result = await createOrderMutation();
    await addToOrderMutation({
      variables: {
        orderId: result.data.createUserOrder.userOrder.id,
        productId: Number(id),
      },
    });

    setResultOrderId(result.data.createUserOrder.userOrder.id);
  }

  if (loading) return <LoadingBars animator={{ activate: true }} size={2} speed={4} full />;

  if (resultOrderId) {
    return (
        <div className="reservation">
          <FrameLines
            className="reservation__heading-box"
            animator={{ activate: true }}
            hover
          >
            <h1 className="reservation__heading">
              Your order has been successfully created!
            </h1>
            <br />
            <br />
            <Text animator={{ activate: true }}>You can reference you order by this handle: {resultOrderId}</Text>
            <br />
            <br />
            <Button
              className="reservation__button"
              animator={{ activate: true }}
              onClick={() => history.push("/")}
            >
              <Text>Continue</Text>
            </Button>
          </FrameLines>
        </div>
      );
  }

  return (
    <div className="reservation">
      <FrameCorners
        className="reservation__heading-box"
        animator={{ activate: true }}
        hover
      >
        <h1 className="reservation__heading">
          Do you confirm your reservation for {data.productById.name}?
        </h1>
        <Button
          className="reservation__button"
          animator={{ activate: true }}
          onClick={reserve}
        >
          <Text>Confirm</Text>
        </Button>
      </FrameCorners>
    </div>
  );
}
