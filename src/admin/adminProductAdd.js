import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import classNames from "classnames";

import Editor from "../components/Editor";
import { ProductPost, ProductImgPost } from "../slice/ProductSlice";
import { getList } from "../slice/CategorySlice";
import regexHelper from "../helper/RegexHelper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { cloneDeep } from "lodash";

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

                    select {
                        width: 200px;
                        height: 30px;
                        border: none;
                        outline: none;
                        margin-right: 20px;
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
                        margin-bottom: 10px;
                    }

                    .sizeInput {
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
                    }
                }
            }
        }
    }
`;

const adminProductAdd = memo(() => {
    const [color, setColor] = useState(true);
    const [colorList, setColorList] = useState([]);
    const [content, setContent] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [category, setCategory] = useState(null);
    const [count, setCount] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data, file, loading, error } = useSelector((state) => state.ProductSlice);
    const { data: data2, loading: loading2, error: error2 } = useSelector((state) => state.CategorySlice);

    useEffect(() => {
        dispatch(getList());
    }, []);

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

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const current = e.target;
            if (colorList.length == 0) {
                window.alert("색상을 추가하세요.");
                return;
            }

            try {
                regexHelper.value(current.name, "상품 이름이 없습니다.");
                regexHelper.value(current.afterprice, "가격이 없습니다.");
                regexHelper.value(current.category, "카테고리가 없습니다.");
            } catch (err) {
                window.alert(err.message);
                return;
            }

            const name = current.name.value;
            const price = current.afterprice.value;
            const depth2_id = current.category.value;
            const color = current.color.value;
            const size = Array.from(current["size[]"]).map((v, i) => v.value);
            const file = [];
            fileList.forEach((v, i) => {
                const list = {};
                list["color"] = color;
                list["path"] = v.url;
                list["origin_name"] = v.originalname;

                file.push(list);
            });

            dispatch(
                ProductPost({
                    name: name,
                    price: price,
                    depth2_id: depth2_id,
                    dsc: content,
                    color: color,
                    size: size,
                    file: file,
                }),
            ).then((result) => {
                navigate(`/admin/product_detail/${result.payload.data.id}`);
            });
        },
        [colorList, fileList, content],
    );

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

    return (
        <Container>
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
            <form onSubmit={onSubmit}>
                <div className="tab">
                    <div className="colorBtn">
                        {colorList.length != 0 &&
                            colorList.map((v, i) => {
                                if (v != "") {
                                    return (
                                        <button key={i} type="button">
                                            <input type="hidden" name="color" value={v} />
                                            {v}
                                        </button>
                                    );
                                }
                            })}
                    </div>
                    <div className="addBtn">
                        <button type="button" onClick={onColor}>
                            색상 추가하기
                        </button>
                    </div>
                </div>
                <div className="imgAdd">
                    <div className="title">
                        <p>상품 이미지</p>
                        <label htmlFor="product">이미지 추가하기</label>
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
                                        <img src={v.url} alt={v.fieldname} />
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
                        <input type="text" name="name" placeholder="상품명을 입력하세요." />
                    </div>
                    <div className="productDesc">
                        <p>상품 상세설명 입력란</p>
                        <div className="editor">
                            <Editor setContent={setContent} />
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
                            <input type="text" name="preprice" value={0} readOnly />
                        </div>
                        <div className="afterPrice">
                            <label htmlFor="afterprice">변경 가격</label>
                            <input type="text" name="afterprice" placeholder="변경 가격을 입력하세요." />
                        </div>
                    </div>
                    <div className="categoryBox">
                        <div className="major">
                            <p>대분류 선택</p>
                            <select onChange={categoryChange}>
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
                            <select name="category">
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
        </Container>
    );
});

export default adminProductAdd;
