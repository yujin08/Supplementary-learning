import { gql } from "@apollo/client";

export const FETCH_USED_ITEMS_BEST = gql`
  query fetchUseditemsOfTheBest {
    fetchUseditemsOfTheBest {
      _id
      name
      remarks
      price
      tags
      soldAt
      images
      createdAt
      pickedCount
    }
  }
`;

export const FETCH_USED_ITEMS = gql`
  query fetchUseditems($page: Int, $search: String, $isSoldout: Boolean) {
    fetchUseditems(page: $page, search: $search, isSoldout: $isSoldout) {
      _id
      name
      remarks
      price
      tags
      soldAt
      images
      createdAt
      pickedCount
    }
  }
`;