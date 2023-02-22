import { Modal } from 'antd'
import { useEffect, useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode'
import Uploads02 from '../../../../commons/uploads/02/Uploads01.container';
import  * as S from './new.styles'
import { v4 as uuidv4 } from "uuid";
import { useForm } from 'react-hook-form';
import { schema } from './new.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRecoilState } from 'recoil';
import { isEditState } from '../../../../commons/stores';
import { useMutation } from '@apollo/client';
import { IMutation, IMutationCreateUseditemArgs, IMutationUpdateUseditemArgs } from '../../../../commons/types/generated/types';
import { CREATE_USED_ITEM, UPDATE_USED_ITEM } from './new.query';
import { useRouter } from 'next/router';
import { withAuth } from '../../../commons/hocs/withAuth';


declare const window: typeof globalThis & {
    kakao: any;
  };

function MarketNew(props) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useRecoilState(isEditState);
    const [fileUrls, setFileUrls] = useState(["", ""]);
    const [tagItem, setTagItem] = useState("");
    const [address, setAddress] = useState("");
    const [tagList, setTagList] = useState([]);
    const [zipcode, setZipcode] = useState("07250");

    const [createUseditem] = useMutation<
    Pick<IMutation, "createUseditem">,
    IMutationCreateUseditemArgs
  >(CREATE_USED_ITEM);

  const [updateUseditem] = useMutation<
    Pick<IMutation, "updateUseditem">,
    IMutationUpdateUseditemArgs
  >(UPDATE_USED_ITEM);
    
      const onChangeFileUrls = (fileUrl: string, index: number) => {
        const newFileUrls = [...fileUrls];
        newFileUrls[index] = fileUrl;
        setFileUrls(newFileUrls);
      };

      const { register, handleSubmit, formState, setValue, trigger, getValues } =
      useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          name: props.data?.fetchUseditem.name ?? "",
          price: props.data?.fetchUseditem.price ?? "",
          remarks: props.data?.fetchUseditem.remarks ?? "",
          tags: props.data?.fetchUseditem.tags,
          contents: props.data?.fetchUseditem.contents ?? "",
          address: props.data?.fetchUseditem.useditemAddress?.address ?? "",
          addressDetail:
            props.data?.fetchUseditem.useditemAddress?.addressDetail ?? "",
            zipcode: props.data?.fetchUseditem.useditemAddress?.zipcode ?? ""
        },
      });

      const checkKeyDown = (e) => {
        if (e.target.value.length !== 0 && e.code === "Enter") {
          e.preventDefault();
          submitTagItem();
        }
      };

      const submitTagItem = () => {
        let updatedTagList = [...tagList];
        updatedTagList.push(tagItem);
        setTagList(updatedTagList);
        setTagItem("");
      };
    
      const deleteTagItem = (e) => {
        const deleteTagItem = e.target.tabIndex;
        const filteredTagList = tagList.filter(
          (el, index) => index !== deleteTagItem
        );
        setTagList(filteredTagList);
      };

      const onChangeAddress = (e) => {
        setValue("useditemAddress.address", e.target.value);
        void trigger("useditemAddress.address");
      };

      const onToggleModal = () => {
        setIsOpen((prev) => !prev);
      };

      const onChangeContents = (value: string) => {
        console.log(value);
        setValue("contents", value === "<p><br></p>" ? "" : value);
        void trigger("contents");
      };

      const handleComplete = (data: Address) => {
        onToggleModal();
        setAddress(data.address);
        setZipcode(data.zonecode);
      };

      const onClickSubmit = async (data) => {
        try {
            const result = await createUseditem({
              variables: {
                createUseditemInput: {
                  name: data.name,
                  price: data.price,
                  contents: data.contents,
                  remarks: data.remarks,
                  images: [...fileUrls],
                  tags: tagList,
                  useditemAddress: {
                    zipcode: data.zipcode,
                    address: address,
                    addressDetail: data.addressDetail,
                    lat: data.lat,
                    lng: data.lng,
                  },
                },
              },
            });
            router.push(`/market/${result.data?.createUseditem._id}`);
            console.log(result);
          } catch (error) {
            if (error instanceof Error) Modal.error({ content: error });
          }
      }


  useEffect(() => {
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
          isPanto: true,
        };

        const map = new window.kakao.maps.Map(container, options);

        const geocoder = new window.kakao.maps.services.Geocoder()
        if (props.data !== undefined) {
          if (address === "") {
            setTagList(props.data.fetchUseditem.tags);
            setAddress(props.data.fetchUseditem.useditemAddress.address);
          }
        }

        geocoder.addressSearch(
          address ? address :
           "제주특별자치도 제주시 첨단로 242",
          function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              setValue("lat", Number(result[0].y));
              void trigger("lat");
              setValue("lng", Number(result[0].x));
              void trigger("lng");

              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x
              );

              const marker = new window.kakao.maps.Marker({
                map: map,
                position: coords,
              });

              const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="width:150px;text-align:center;padding:6px 0;">${result[0].address.address_name}</div>`,
              });
              infowindow.open(map, marker);

              map.setCenter(coords);
            }
          }
        );
        
      });
    };
  }, [address]);

  const EditBtn = async (data: any) => {
    if (
      !data.name &&
      !data.price &&
      !data.contents &&
      !address &&
      !data.addressDetail &&
      !data.remarks
    ) {
      alert("수정한 내용이 없습니다.");
      return;
    }

    const updateUseditemInput: IUpdateUseditemInput = {};
    if (data.name) updateUseditemInput.title = data.name;
    if (data.price) updateUseditemInput.title = data.price;
    if (data.contents) updateUseditemInput.contents = data.contents;
    if (data.remarks) updateUseditemInput.youtubeUrl = data.remarks;
    if (address || data.addressDetail) {
      updateUseditemInput.boardAddress = {};
      if (address) updateUseditemInput.boardAddress.address = address;
      if (data.addressDetail)
        updateUseditemInput.boardAddress.addressDetail = data.addressDetail;
    }

    try {
      if (typeof router.query.useditemId !== "string") return;
      const result = await updateUseditem({
        variables: {
          updateUseditemInput: {
            name: data.name,
            price: data.price,
            contents: data.contents,
            remarks: data.remarks,
            images: [...fileUrls],
            tags: tagList,
            useditemAddress: {
              zipcode: zipcode,
              address: address,
              addressDetail: data.addressDetail,
              lat: data.lat,
              lng: data.lng,
            },
          },
          useditemId: router.query.useditemId,
        },
      });
      alert("수정되었습니다!");
      router.push(`/market/${result.data?.updateUseditem._id}`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

    return(
        <S.Wrapper onSubmit={handleSubmit(isEdit ? EditBtn : onClickSubmit)}>
            <S.TitleWrap>
            <S.Title>
                {isEdit ? "상품 수정" : "상품 등록"}
            </S.Title>
            </S.TitleWrap>
            <S.ItemWrap>
                <S.Name>상품명</S.Name>
                <S.LongInput type="text" placeholder="상품명을 작성해주세요" {...register("name")}/>
            </S.ItemWrap>
            <S.ItemWrap>
                <S.Name>상품 요약</S.Name>
                <S.LongInput type="text" placeholder="상품요약을 작성해주세요" {...register("remarks")}/>
            </S.ItemWrap>
            <S.ContentWrap>
                <S.Content>상품 내용</S.Content>
                <S.CusReactQuill
                placeholder="상품을 설명해주세요." onChange={onChangeContents}  defaultValue={getValues("contents")}
          />
            </S.ContentWrap>
            <S.ItemWrap>
                <S.Name>판매 가격</S.Name>
                <S.LongInput type="number" placeholder="판매 가격을 입력해주세요" {...register("price")}/>
            </S.ItemWrap>
            <S.ItemWrap>
                <S.Name>태그입력</S.Name>
                <S.TagBox>
            {tagList.map((tagItem, index) => {
              return (
                <S.TagItem key={index} tabIndex={index} onClick={deleteTagItem}>
                  <S.Text tabIndex={index} onClick={deleteTagItem}>
                    {tagItem}
                  </S.Text>
                </S.TagItem>
              );
            })}
            <S.TagInput
              type="text"
              placeholder="#태그 #태그 #태그"
              onChange={(e) => setTagItem(e.target.value)}
              value={tagItem}
              onKeyPress={(e) => checkKeyDown(e)}
            />
          </S.TagBox>
            </S.ItemWrap>
        <S.MapWrapper>
        <S.Name>브랜드 위치</S.Name>
        <S.MapContent>
          <S.Map_Left>
            <S.MapBox id="map"></S.MapBox>
          </S.Map_Left>
          <S.Map_Right>
            <S.GPSWrapper>
              <S.ZonInput type="text" readOnly
              value={zipcode}
                />
              <S.Button type="button"  
              onClick={onToggleModal}
              >
                우편번호 검색
              </S.Button>
              {isOpen && (
                <Modal
                  open={true}
                  onOk={onToggleModal}
                  onCancel={onToggleModal}
                >
                  <DaumPostcodeEmbed onComplete={handleComplete} />
                </Modal>
              )}
            </S.GPSWrapper>
              <S.AdressDetailInput
                type="text"
                onChange={onChangeAddress}
                readOnly
                value={address}
              />
              <S.AdressDetailInput
               type="text" {...register("addressDetail")} 
                />
          </S.Map_Right>
          </S.MapContent>
        </S.MapWrapper>
        <S.ImgWrapper>
          <S.Name>사진 첨부</S.Name>
          <S.ButtonWrapper>
            {fileUrls?.map((el, index) => (
              <Uploads02
                key={uuidv4()}
                index={index}
                fileUrl={el}
                onChangeFileUrls={onChangeFileUrls}
              />
            ))}
          </S.ButtonWrapper>
        </S.ImgWrapper>
        <S.BtnWrap>
            <S.CancelBtn type='button'>
                취소
            </S.CancelBtn>
            <S.EnrollBtn>
            {isEdit ? "수정" : "등록"}
            </S.EnrollBtn>
        </S.BtnWrap>
        </S.Wrapper>
    )
}

export default withAuth(MarketNew)