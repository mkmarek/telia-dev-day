import React from "react";
import { FramePentagon, Blockquote, Text, LoadingBars, FrameLines } from "@arwes/core";
import { AnimatorGeneralProvider } from "@arwes/animation";
import { useHistory } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import "./style.css";
import Item from "./item";
const animatorGeneral = { duration: { enter: 200, exit: 200 } };

const query = gql`
  query catalogue($categoryId: Int, $manufacturerId: Int) {
    allCategories {
      nodes {
        id
        name
      }
    }
    allManufacturers {
      nodes {
        id
        name
      }
    }
    allProducts(
      condition: { categoryId: $categoryId, manufacturerId: $manufacturerId }
    ) {
      nodes {
        id
        name
        description
        categoryByCategoryId {
          id
          name
        }
      }
    }
  }
`;

export default function Catalogue() {
  const history = useHistory();
  const [categoryId, setCategoryId] = React.useState(null);
  const [manufacturerId, setManufacturerId] = React.useState(null);

  const filter = {};
  if (categoryId) filter.categoryId = Number(categoryId);
  if (manufacturerId) filter.manufacturerId = Number(manufacturerId);
  const { data, loading, error } = useQuery(query, {
    variables: filter,
  });

  return (
    <div className="catalogue">
      <AnimatorGeneralProvider animator={animatorGeneral}>
        <div className="catalogue__filters">
          <FramePentagon
            className="catalogue__filter"
            animator={{ activate: true }}
            hover
          >
            <label className="catalogue__filter-text">
              <span style={{ paddingTop: 10 }}>Manufacturers</span>
              <select
                value={manufacturerId}
                onChange={(e) => setManufacturerId(e.target.value)}
                className="catalogue__filter-select"
              >
                <option value="">All</option>
                {!loading &&
                  data.allManufacturers.nodes.map((manufacturer) => (
                    <option value={manufacturer.id}>{manufacturer.name}</option>
                  ))}
              </select>
            </label>
          </FramePentagon>
          <FramePentagon
            className="catalogue__filter"
            animator={{ activate: true }}
            hover
          >
            <label className="catalogue__filter-text">
              <span style={{ paddingTop: 10 }}>Categories</span>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="catalogue__filter-select"
              >
                <option value="">All</option>
                {!loading &&
                  data.allCategories.nodes.map((category) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
              </select>
            </label>
          </FramePentagon>
        </div>
        <div className="catalogue__quote">
          <Blockquote>
            <Text>
              Sorry for the lack of ship images. Our vehicles tend to get a bit
              shy.
            </Text>
          </Blockquote>
        </div>
        {loading && (
          <LoadingBars animator={{ activate: true }} size={2} speed={4} full />
        )}
        {!loading && !data.allProducts.nodes.length && (
          <FrameLines
            className="catalogue__quote"
            animator={{ activate: true }}
            palette="error"
            largeLineWidth={2}
            smallLineWidth={4}
            smallLineLength={20}
            hideShapes
            hover
          >
            <div style={{ padding: 50 }}>
                Whoops. We don't seem to he any ships available for your selected filter.
            </div>
          </FrameLines>
        )}
        {!loading && (
          <div className="catalogue__content">
            {data.allProducts.nodes.map((product) => (
              <Item {...product} />
            ))}
          </div>
        )}
      </AnimatorGeneralProvider>
    </div>
  );
}
