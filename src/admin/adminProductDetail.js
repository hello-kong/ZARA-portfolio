import React, { memo, useState, useCallback, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";
import classNames from "classnames";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProductPostDetail, ProductPut, ProductImgPost, ProductItem } from "../slice/ProductSlice";
import { getList } from "../slice/CategorySlice";

import Spinner from "../components/Spinner";
import { cloneDeep } from "lodash";
import dayjs from "dayjs";
import Editor from "../components/Editor";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

// 색깔 페이지 삭제(데이터에 있는 색깔+추가한 색깔을 임시 상태값 배열에 넣어서 추가 및 삭제 하도록), 색깔 버튼에 따라 따로 정보 작성할 수 있도록, 이미지 업로드 기능, 카테고리 옵션 데이터에 따라 작성되도록 변경, 전체 데이터 추가 및 수정할 수 있도록, 원래 있던 데이터가 있다면 보여지도록 하는 기능 구현 예정.

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    box-sizing: border-box;
    position: relative;

    .hidden {
        display: none;
    }

    .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        background-color: rgba(209, 209, 209);
        opacity: 0.5;
    }

    .color {
        width: 500px;
        height: 200px;
        background-color: #fff;
        opacity: 1;
        position: fixed;
        top: 35%;
        z-index: 5;

        .titleBox {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-between;
            padding: 15px;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;

            p {
                color: #777;
            }

            button {
                width: 20px;
                height: 20px;
                background-color: transparent;
                border: none;
            }
        }

        .contentBox {
            width: 100%;
            height: 450px;
            padding: 15px;
            box-sizing: border-box;

            form {
                height: auto;
                padding: 0;
                flex-direction: column;

                label {
                    font-size: 14px;
                    text-align: left;
                }

                input {
                    margin-top: 10px;
                    margin-bottom: 50px;
                    border: none;
                    border-bottom: 1px solid #b2aeae;
                    outline: none;
                }

                button {
                    width: 100px;
                    height: 30px;
                    background-color: #fff;
                    border: 1px solid #b2aeae;
                    transform: translateX(190%);
                }
            }
        }
    }

    form {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        padding-top: 1%;
        box-sizing: border-box;
        & > div {
            background-color: #fff;
            width: 48%;
            height: 600px;
            margin-bottom: 1%;

            .title {
                padding: 10px;
                box-sizing: border-box;
                color: #777;
                border-bottom: 1px solid #eee;
            }
        }

        .imgAdd,
        .tab,
        .etc {
            width: 97%;
            margin: auto;
            margin-bottom: 1%;
        }

        .tab {
            height: 50px;
            display: flex;
            justify-content: space-between;

            button {
                width: 100px;
                height: 50px;
                border: none;
                background-color: #fff;

                &:hover {
                    background-color: #d5d5d5;
                }

                &.active {
                    background-color: #d5d5d5;
                }
            }
        }

        .imgAdd {
            .title {
                display: flex;
                justify-content: space-between;
                align-items: center;

                label {
                    width: 120px;
                    height: 100%;
                    background-color: #fff;
                    border: none;
                    color: blue;
                    font-weight: bold;
                    font-size: 12px;
                    text-align: center;

                    &:hover {
                        cursor: pointer;
                    }
                }

                input {
                    display: none;
                }
            }

            .imgBox {
                padding: 2%;
                box-sizing: border-box;
                display: flex;
                flex-wrap: wrap;

                .img {
                    width: 150px;
                    height: 150px;
                    margin-right: 2%;
                    margin-bottom: 2%;
                    position: relative;

                    &:nth-of-type(8n) {
                        margin-right: 0;
                    }

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .deleteBtn {
                        position: absolute;
                        right: 34%;
                        top: 40%;
                        padding: 5px 10px;
                        background-color: #fff;
                        border: none;
                        display: none;
                    }

                    &:hover {
                        img {
                            opacity: 0.5;
                        }

                        .deleteBtn {
                            display: block;
                            z-index: 10;
                        }
                    }
                }
            }
        }

        .desc {
            .productName {
                padding: 10px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;

                label {
                    font-size: 14px;
                    margin-bottom: 10px;
                }

                input {
                    height: 30px;
                    outline: none;
                    border: none;
                    border-bottom: 1px solid #888;
                }
            }

            .productDesc {
                padding: 10px;
                box-sizing: border-box;

                p {
                    margin-bottom: 10px;
                }

                .editor {
                    border: 1px solid #888;
                    height: 420px;

                    .ck {
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                    }
                }
            }
        }

        .price {
            .priceBox {
                padding: 20px;
                box-sizing: border-box;

                .prePrice,
                .afterPrice {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 50px;

                    label {
                        margin-bottom: 10px;
                        font-size: 14px;
                    }

                    input {
                        height: 30px;
                        outline: none;
                        border: none;
                        border-bottom: 1px solid #888;
                    }
                }
            }

            .categoryBox {
                padding: 20px;
                box-sizing: border-box;

                .major,
                .minor {
                    p {
                        margin-bottom: 20px;
                    }

                    select,
                    input {
                        width: 200px;
                        height: 30px;
                        border: none;
                        outline: none;
                        margin-right: 20px;
                    }

                    input {
                        display: none;
                        margin: 0;

                        &.write {
                            display: inline-block;
                        }
                    }
                }

                .major {
                    margin-bottom: 50px;
                }
            }
        }

        .submitBtn {
            padding: 10px 40px;
            background-color: #fff;
            border: none;
        }

        .etc {
            .etcBox {
                padding: 20px;
                box-sizing: border-box;

                .size {
                    p {
                        margin-top: 50px;
                        margin-bottom: 10px;
                    }

                    .sizeInput,
                    .sizeBox {
                        margin-bottom: 10px;
                        input {
                            margin-right: 10px;
                            outline: none;
                            border: none;
                            border-bottom: 1px solid #000;
                        }
                        button {
                            background-color: transparent;
                            border: none;
                            height: 20px;

                            &:hover {
                                background-color: #eee;
                            }

                            &.hidden {
                                display: none;
                            }
                        }

                        select {
                            border: none;
                            outline: none;
                            height: 20px;
                        }
                    }
                }
            }
        }
    }
`;

const adminProductDetail = memo(() => {
    const [color, setColor] = useState(true);
    const [colorList, setColorList] = useState([]);
    const [activeColor, setActiveColor] = useState(null);
    const [content, setContent] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [category, setCategory] = useState(null);
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { id } = useParams();

    const { data, file, loading, error } = useSelector((state) => state.ProductSlice);
    const { data: data2, loading: loading2, error: error2 } = useSelector((state) => state.CategorySlice);

    useEffect(() => {
        dispatch(getList());
        dispatch(ProductItem({ id: id })).then((result) => {
            setActiveColor(result.payload.data.color[0].color);
            setCategory(result.payload.data.product.depth1_id);
        });
    }, [id]);

    console.log(data);

    const categoryChange = useCallback(
        (e) => {
            setCategory(e.target.value);
        },
        [category],
    );

    const addFile = (e) => {
        const file = Array.from(e.currentTarget.files);
        const formData = new FormData();
        file.forEach((v, i) => formData.append("product", v));
        dispatch(ProductImgPost(formData)).then((result) => {
            setFileList([...fileList, ...result.payload.data]);
        });
    };

    const onColor = useCallback(
        (e) => {
            setColor(!color);
        },
        [color],
    );

    const colorAdd = useCallback(
        (e) => {
            e.preventDefault();
            const current = e.target;
            setColorList([...colorList, current.color.value]);
            setColor(true);
        },
        [colorList],
    );

    const colorPage = useCallback((e) => {
        const current = e.target;
        setActiveColor(current.dataset.color);
    }, []);

    const onDelete = useCallback(
        (e) => {
            const index = e.target.dataset.index;
            const result = cloneDeep(fileList);
            result.splice(index, 1);
            setFileList([...result]);
        },
        [fileList],
    );

    const onSize = useCallback(
        (e) => {
            setCount((count) => count + 1);
            e.currentTarget.classList.add("hidden");
        },
        [count],
    );

    return (
        <Container>
            <Spinner visible={loading || loading2} />
            <div className={classNames("overlay", { hidden: color })}></div>
            <div className={classNames("color", { hidden: color })}>
                <div className="titleBox">
                    <p>색상 추가</p>
                    <button type="button" onClick={onColor}>
                        <FontAwesomeIcon icon={faX} />
                    </button>
                </div>
                <div className="contentBox">
                    <form onSubmit={colorAdd}>
                        <label htmlFor="color">색상 이름을 입력하세요.</label>
                        <input type="text" id="color" name="color" />
                        <button type="submit">추가하기</button>
                    </form>
                </div>
            </div>
            {data && activeColor !== null && (
                <form>
                    <div className="tab">
                        <div className="colorBtn">
                            {data.color.length != 0 &&
                                data.color.map((v, i) => {
                                    if (v != "") {
                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                data-color={v.color}
                                                onClick={colorPage}
                                                className={classNames({ active: activeColor == v.color })}
                                            >
                                                {v.color}
                                            </button>
                                        );
                                    }
                                })}
                            {colorList.length != 0 &&
                                colorList.map((v, i) => {
                                    if (v != "") {
                                        return (
                                            <button
                                                key={i}
                                                type="button"
                                                data-color={v}
                                                onClick={colorPage}
                                                className={classNames({ active: activeColor == v })}
                                            >
                                                {v}
                                            </button>
                                        );
                                    }
                                })}
                        </div>
                        <div className="addBtn">
                            <button type="button">현재 색상 삭제</button>
                            <button type="button" onClick={onColor}>
                                색상 추가하기
                            </button>
                        </div>
                    </div>
                    <div className="imgAdd">
                        <div className="title">
                            <p>상품 이미지</p>
                            <label htmlFor="imgadd">이미지 추가하기</label>
                            <input type="file" id="product" name="product" multiple onChange={addFile} />
                        </div>
                        <div className="imgBox">
                            {fileList &&
                                fileList.map((v, i) => {
                                    return (
                                        <div className="img" key={i}>
                                            <button type="button" className="deleteBtn" data-index={i} onClick={onDelete}>
                                                삭제
                                            </button>
                                            <img src={v.url} alt="product" />
                                        </div>
                                    );
                                })}
                            {data.file.length != 0 &&
                                data.file.map((v, i) => {
                                    return (
                                        <div className="img" key={i}>
                                            <button type="button" className="deleteBtn" data-index={i} onClick={onDelete}>
                                                삭제
                                            </button>
                                            <img src={v.path} alt="product" />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className="desc">
                        <div className="title">
                            <p>상품 상세설명</p>
                        </div>
                        <div className="productName">
                            <label htmlFor="name">상품명</label>
                            <input type="text" name="name" placeholder="상품명을 입력하세요." defaultValue={data.product.name} />
                        </div>
                        <div className="productDesc">
                            <p>상품 상세설명 입력란</p>
                            <div className="editor">
                                <Editor setContent={setContent} content={data.product.dsc || "작성된 설명이 없습니다."} />
                            </div>
                        </div>
                    </div>
                    <div className="price">
                        <div className="title">
                            <p>상품 가격 및 카테고리</p>
                        </div>
                        <div className="priceBox">
                            <div className="prePrice">
                                <label htmlFor="preprice">현재 가격</label>
                                <input type="text" name="preprice" defaultValue={data.product.price} />
                            </div>
                            <div className="afterPrice">
                                <label htmlFor="afterprice">변경 가격</label>
                                <input type="text" name="afterprice" placeholder="변경 가격을 입력하세요." />
                            </div>
                        </div>
                        <div className="categoryBox">
                            <div className="major">
                                <p>대분류 선택</p>
                                <select defaultValue={data.product.depth1_id} onChange={categoryChange}>
                                    <option value="" hidden>
                                        대분류를 선택하세요.
                                    </option>
                                    {data2 &&
                                        data2.cg1.map((v, i) => {
                                            return (
                                                <option value={v.id} key={i}>
                                                    {v.depth1}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="minor">
                                <p>소분류 선택</p>
                                <select defaultValue={data.product.depth2_id}>
                                    <option value="" hidden>
                                        소분류를 선택하세요.
                                    </option>
                                    {data2 &&
                                        data2.cg2.map((v, i) => {
                                            if (v.depth1_id == category) {
                                                return (
                                                    <option value={v.depth2_id} key={i}>
                                                        {v.depth2}
                                                    </option>
                                                );
                                            }
                                        })}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="etc">
                        <div className="title">
                            <p>기타사항</p>
                        </div>
                        <div className="etcBox">
                            <div className="size">
                                {data.detail.map((v, i) => {
                                    return (
                                        <div className="sizeBox" key={i}>
                                            <input type="text" name="size" defaultValue={v.size} readOnly />
                                            <button type="button">삭제</button>
                                            <select defaultValue={v.use_amount}>
                                                <option value="Y">판매중</option>
                                                <option value="N">품절</option>
                                            </select>
                                        </div>
                                    );
                                })}
                                <p>사이즈 추가</p>
                                <div className="sizeInput">
                                    <input type="text" name="size[]" placeholder="사이즈를 입력하세요." />
                                    <button type="button" onClick={onSize}>
                                        추가
                                    </button>
                                </div>
                                {new Array(count).fill(0).map((v, i) => {
                                    return (
                                        <div className="sizeInput" key={i}>
                                            <input type="text" name="size[]" placeholder="사이즈를 입력하세요." />
                                            <button type="button" onClick={onSize}>
                                                추가
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="submitBtn">
                        저장하기
                    </button>
                </form>
            )}
        </Container>
    );
});

export default adminProductDetail;
