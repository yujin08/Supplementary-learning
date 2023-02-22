import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroller';
import { IQuery, IQueryFetchUseditemsArgs } from '../../../../commons/types/generated/types';
import { withAuth } from '../../../commons/hocs/withAuth';
import ItemCard from '../../../commons/Product/Product'
import ItemCard2 from '../../../commons/Product/BestProduct';
import { FETCH_USED_ITEMS, FETCH_USED_ITEMS_BEST } from './list.query';
import * as S from './list.styles'

function MarketList() {
  const router = useRouter()
    const { data: best} = useQuery
  (FETCH_USED_ITEMS_BEST);

  const { data, fetchMore} = useQuery<
  Pick<IQuery, "fetchUseditems">,
  IQueryFetchUseditemsArgs
>(FETCH_USED_ITEMS);

const onClickWrite = () => {
  router.push(`/market/new`)
}


const onLoadMore = () => {
    if (!data) return;

    fetchMore({
      variables: {
        page: Math.ceil(data?.fetchUseditems.length / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchUseditems == undefined) {
          return {
            fetchUseditems: [...prev.fetchUseditems],
          };
        }
        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult?.fetchUseditems,
          ],
        };
      },
    });
  };

    return(
        <S.Wrapper>
            <S.BestWrap>
                <S.Title>BEST</S.Title>
                <S.ItemWrap>
                    {best?.fetchUseditemsOfTheBest.map((el) =>(
                        <ItemCard key={el.id} el={el}/>
                    ))
                    }
                </S.ItemWrap>
            </S.BestWrap>
            <S.BtnWrap>
                <S.WriteBtn
                onClick={onClickWrite}
                >
                상품 등록
                </S.WriteBtn>
                <S.SearchBox>
                    <S.Input />
                    <SearchOutlined 
                    style={{fontSize: "25px", marginBottom: "5px", cursor: "pointer"}}
                    />
                </S.SearchBox>
            </S.BtnWrap>
            <S.ScrollWrap>
            <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
            <S.Main>
            {data?.fetchUseditems.map((el) =>(
                        <ItemCard2 key={el._id} el={el}/>
                    ))
                    }
            </S.Main>
            </InfiniteScroll>
            </S.ScrollWrap>
        </S.Wrapper>
    )
}
export default withAuth(MarketList)