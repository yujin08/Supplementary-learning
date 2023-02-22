import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { price } from '../../../../commons/libraries/comma';
import { basketsState } from '../../../../commons/stores';
import { IMutation, IMutationCreatePointTransactionOfBuyingAndSellingArgs, IMutationDeleteUseditemArgs, IMutationToggleUseditemPickArgs, IQuery, IQueryFetchUseditemArgs, IQueryFetchUseditemsIPickedArgs } from '../../../../commons/types/generated/types';
import { withAuth } from '../../../commons/hocs/withAuth';
import { FETCH_USER_LOGGED_IN } from '../../../commons/layout/header';

import MarketCommentList from '../../comment/market/CommentList/CommentList.container';
import MarketComment from '../../comment/market/CommentWrite/CommentWrite.container';
import { CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING, DELETE_USED_ITEM, FETCH_USED_ITEM, FETCH_USED_ITEMS_I_PICKED, TOGGLE_USED_ITEM_PICK } from './detail.query';
import * as S from './detail.styles'

declare const window: typeof globalThis & {
    kakao: any;
  };

 function MarketDetail() {
  const [BasketsState, setBasketsState] = useRecoilState(basketsState);
    const [tags,setTags] = useState([])
    const router = useRouter()
    const [isPick, setIsPick] = useState(false)
    const [loginUser, setLoginUser] = useState(false)

    const { data:loggedInUser } = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

    const { data:Picked} = useQuery<
    Pick<IQuery, "fetchUseditemsIPicked">,
    IQueryFetchUseditemsIPickedArgs
  >(FETCH_USED_ITEMS_I_PICKED);


  
    const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: {
      useditemId: String(router.query.useditemId),
    },
  });
  console.log(data)
  const [toggleUseditemPick] = useMutation<
  Pick<IMutation, "toggleUseditemPick">,
  IMutationToggleUseditemPickArgs
>(TOGGLE_USED_ITEM_PICK);

const [deleteUseditem] = useMutation<
Pick<IMutation, "deleteBoard">,
IMutationDeleteUseditemArgs
>(DELETE_USED_ITEM);

const [createPointTransactionOfBuyingAndSelling] = useMutation<
Pick<IMutation, "createPointTransactionOfBuyingAndSelling">,
IMutationCreatePointTransactionOfBuyingAndSellingArgs
>(CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING);

const onClickEdit = () => {
  router.push(`/market/${router.query.useditemId}/edit`);
};

const onClickPick = async () => {
  setIsPick(prev => !prev)
  await toggleUseditemPick({
    variables: {
      useditemId: String(router.query.useditemId),
    },
    refetchQueries: [
      {
        query: FETCH_USED_ITEM,
        variables: { useditemId: router.query.useditemId },
      },
    ],
  });
};

const onClickPay = async () => {
  await createPointTransactionOfBuyingAndSelling({
    variables: {
      useritemId: String(data?.fetchUseditem._id),
    },refetchQueries: [
      {
        query: FETCH_USER_LOGGED_IN
      },
    ],
  });
  alert("구매가 완료되었습니다.");
  router.push("/market");
};

  const onClickDelete = () => {
    try{
      void deleteUseditem({
        variables: {
          useditemId: String(data?.fetchUseditem._id),
        },
        
      });

    }catch (error) {
      if (error instanceof Error) alert(error.message);
    }
    
    router.push("/market");
  }

  const onClickBasket = (usedItem) => () => {
    const baskets = JSON.parse(localStorage.getItem("baskets")) || []
    let isExists = false
 
    baskets.forEach(basketEl => {
      if(usedItem === basketEl) isExists = true
    });
    if(isExists) {
      baskets.forEach((el, index) => {
        if(usedItem === el){
          alert("이미 장바구니에 담으셨습니다!")
          baskets?.splice(index,1)
          setBasketsState(baskets.length)
      console.log(JSON.parse(localStorage.getItem("baskets")))
        }
      })
      
    }else{
      baskets.push(usedItem)
      localStorage.setItem("baskets", JSON.stringify(baskets))
      alert("장바구니에 담았습니다!")
      

    }
 
  }

    useEffect(() => {

        if(loggedInUser?.fetchUserLoggedIn._id === data?.fetchUseditem.seller._id){
          setLoginUser(true)
        }

        const script = document.createElement("script"); // <script></script> 랑 동일
        script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=60d701217f2e5767f7f2323406c17e5a&libraries=services&autoload=false";
        document.head.appendChild(script);
    
        script.onload = () => {
          window.kakao.maps.load(function () {
            const container = document.getElementById("map");
            const options = {
              center: new window.kakao.maps.LatLng(33.450701, 126.570667),
              level: 3,
            };
    
            const map = new window.kakao.maps.Map(container, options);
    
            if (data?.fetchUseditem) {
              const lat = data?.fetchUseditem.useditemAddress?.lat ? data?.fetchUseditem.useditemAddress?.lat : 33.450701, // 위도
                lon = data?.fetchUseditem.useditemAddress?.lng ? data?.fetchUseditem.useditemAddress?.lng : 126.570667; // 경도
    
              const locPosition = new window.kakao.maps.LatLng(lat, lon); 
    
              displayMarker(locPosition);
            } else {
              const locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
    
              displayMarker(locPosition);
            }
    
            function displayMarker(locPosition) {
       
              const marker = new window.kakao.maps.Marker({
                map: map,
                position: locPosition,
              });
              map.setCenter(locPosition);
            }
          });
        };
      }, [data]);
    return(
        <>
        <S.Main>
            <S.Main_Left>
                <S.ImgBox
                 style={{
                  backgroundImage:
                  `url(https://storage.googleapis.com/${data?.fetchUseditem.images?.[0]})` }}
                ></S.ImgBox>
            </S.Main_Left>
            <S.Main_Right>
                <S.TItle>
                  <S.BrandLine>
                    <S.Brand>AVANDRESS</S.Brand>
                    {loginUser?
                             <S.IconWrap>
                             <S.EditIcon
                             onClick={onClickEdit}
                             src='/edit.png'
                             />
                             <S.DeleteIcon
                             onClick={onClickDelete}
                              src='/delete.png'
                             />
                           </S.IconWrap>
                    : <></>}
            
                  </S.BrandLine>
                    <S.Name>[SET] {data?.fetchUseditem.name}</S.Name>
                </S.TItle>
                <S.Price_Pick>
                    <S.PriceWrap>
                        <S.Price_ko>판매가</S.Price_ko>
                        <S.Price_num>{price(data?.fetchUseditem.price)}</S.Price_num>
                        <S.Price_ko>원</S.Price_ko>
                    </S.PriceWrap>
                    <S.PickWrap>
                    <S.Pick>MY</S.Pick>
                    {!isPick 
                    ?
                    <HeartOutlined onClick={onClickPick} style={{marginLeft:"10px", marginRight:"10px"}}/>
                    : 
                    <HeartFilled onClick={onClickPick} style={{marginLeft:"10px", marginRight:"10px", color:"red"}}/>
                    }
                    <S.Pick>Product</S.Pick>
                    </S.PickWrap>
                </S.Price_Pick>
                <S.ContentWrap>
                    <S.Remark>
                    {data?.fetchUseditem.remarks}
                    </S.Remark>
                    <S.Tags>
                    {data && data?.fetchUseditem.tags.map((tagItem, index) => {
                    return (
                      <S.TagItem key={index}>
                        <S.Text>#{tagItem}</S.Text>
                      </S.TagItem>
                    );
                  })}
                    </S.Tags>
                </S.ContentWrap>
                <S.BtnWrap>
                    <S.BuyBtn onClick={onClickPay} >BUY NOW</S.BuyBtn>
                    <S.BasketsBtn onClick={onClickBasket(data?.fetchUseditem._id)}>SHOPPING BAG</S.BasketsBtn>
                </S.BtnWrap>
            </S.Main_Right>
        </S.Main>
        <S.DetailWrap>
            <S.DetailTitle>Detail</S.DetailTitle>
            <S.DetailContent>
                <S.Content dangerouslySetInnerHTML={{
                    __html: (data?.fetchUseditem.contents),
                  }}>
                </S.Content>
                <S.deliveryInfo>
                    <S.deliveryInfoTitle>
                    배송/교환/반품/AS 관련 유의사항
                    </S.deliveryInfoTitle>
                    <S.deliveryInfoSubTitle>
                    상품상세설명에 배송/교환/반품/취소 관련 안내가 기재된 경우 다음 안내사항보다 우선 적용됩니다.
                    </S.deliveryInfoSubTitle>
                    <S.Map id = "map"></S.Map>
                    <S.deliveryInfoDetail>
                        <S.InfoDetail>
                        상품별로 상품 특성 및 배송지에 따라 배송유형 및 소요기간이 달라집니다.
                        </S.InfoDetail>
                        <S.InfoDetail>
                        상품의 배송비는 공급업체의 정책에 따라 다르오며 공휴일 및 휴일은 배송이 불가합니다.
                        </S.InfoDetail>
                        <S.InfoDetail_focus>
                        상품하자 이외 사이즈, 색상교환 등 단순 변심에 의한 교환/반품 택배비 고객부담으로 왕복택배비가 발생합니다. (전자상거래 등에서의 소비자보호에 관한 법률 제18조(청약 철회 등) 9항에 의거 소비자의 사정에 의한 청약 철회 시 택배비는 소비자 부담입니다.)
                        </S.InfoDetail_focus>
                        <S.InfoDetail>
                        주문완료 후 재고 부족 등으로 인해 주문 취소 처리가 될 수도 있는 점 양해 부탁드립니다.
                        </S.InfoDetail>
                        <S.InfoDetail>
                        반품/교환은 미사용 제품에 한해 배송완료 후 7일 이내에 접수하여 주십시오.
                        </S.InfoDetail>
                        <S.InfoDetail>
                        제품을 사용 또는 훼손한 경우, 사은품 누락, 상품 TAG 보증서, 상품 부자재가 제거 혹은 분실된 경우, 밀봉포장을 개봉했거나 내부 포장재를 훼손 또는 분실한 경우(단, 제품확인을 위한 개봉 제외)  반품/교환이 불가합니다.
                        </S.InfoDetail>
                        <S.InfoDetail>
                        A/S 기준이나 가능여부는 브랜드와 상품에 따라 다르므로 관련 문의는 에이블리 고객센터를 통해 부탁드립니다.
                        </S.InfoDetail>
                        <S.InfoDetail>
                        상품불량에 의한 반품,교환, A/S, 환불, 품질보증 및 피해보상 등에 관한 사항은 소비자분쟁해결기준(공정거래위원회 고시)에 따라 받으실 수 있습니다.                        </S.InfoDetail>
                    </S.deliveryInfoDetail>
                </S.deliveryInfo>
                <S.DetailTitle>Q & A</S.DetailTitle>
                <MarketComment />
                <MarketCommentList />
            </S.DetailContent>
        </S.DetailWrap>
        </>
    )
}

export default withAuth(MarketDetail)