import React, { memo, useState, useRef, useCallback, useEffect, useMemo } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { getList, PostItem, PutItem, DeleteItem } from "../slice/CategorySlice";
import { Productget, ProductDelete, ProductPut } from "../slice/ProductSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import img from "../assets/img/22-creamWhite-1.jpg";
import dayjs from "dayjs";
import { isArray } from "lodash";
import Spinner from "../components/Spinner";
import Pagenation from "../components/pagenation";

// 전체 체크 기능 구현 예정

const Container = styled.div`
    width: 100%;
    height: 100%;

    .containerBox {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        justify-content: space-evenly;
        padding: 3% 0 3% 0;
        box-sizing: border-box;
    }

    .hidden {
        display: none;
    }

    .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 1;
        background-color: rgba(209, 209, 209);
        opacity: 0.5;
    }

    .CategoryBox {
        width: 500px;
        height: 550px;
        background-color: #fff;
        opacity: 1;
        position: fixed;
        top: 20%;
        left: 45%;
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
                width: 100%;
                height: 100%;
                padding: 0;
                flex-direction: column;

                .add,
                .delete {
                    width: 100%;
                    height: 30%;
                    margin-bottom: 20px;

                    .addBox,
                    .deleteBox {
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;

                        label {
                            font-size: 13px;
                            margin-right: 5px;
                        }

                        input {
                            width: 100px;
                            height: 15px;
                            margin-right: 20px;
                        }

                        select {
                            width: 100px;
                            height: 30px;
                            margin-right: 20px;
                        }
                    }

                    .addBox {
                        div {
                            width: 100%;
                            margin: 10px 0;

                            select {
                                height: auto;
                            }
                        }
                    }
                }

                button {
                    width: 100px;
                    height: 30px;
                    background-color: #fff;
                    border: 1px solid #b2aeae;
                    transform: translateX(190%);
                    margin-top: 120px;
                }
            }
        }
    }

    .category {
        ul {
            width: 100%;
            background-color: #fff;
            box-shadow: 5px 5px 5px #777;

            li {
                width: 100%;
                height: 50px;
                text-align: left;
                padding: 20px 30px;
                box-sizing: border-box;

                &:hover {
                    background-color: #eee;
                    cursor: pointer;
                }

                &:first-child {
                    border: 1px solid #eee;
                    padding: 18px 30px;
                    text-align: center;
                    button {
                        width: 40px;
                        height: auto;
                        border: none;
                        outline: none;
                        background-color: #fff;
                        font-size: 20px;
                        margin-left: 5px;

                        &:hover {
                            background-color: transparent;
                        }
                    }

                    &:hover {
                        background-color: transparent;
                    }
                }
            }

            .cList {
                li {
                    text-align: left;
                    padding: 20px 30px;
                    border: none;
                    &:hover {
                        background-color: #eee;
                        cursor: pointer;
                    }
                    &.sub {
                        height: auto;
                        padding: 0;
                        display: none;

                        &.active {
                            display: block;
                        }

                        &:hover {
                            background-color: transparent;
                        }

                        ul {
                            box-shadow: none;
                            li {
                                padding: 20px 50px;
                                border: none;

                                &:hover {
                                    background-color: #eee;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .product {
        width: 70%;

        .top,
        .search {
            width: 100%;
            height: 50px;
            margin-bottom: 30px;
        }

        .top {
            display: flex;
            justify-content: flex-end;

            a {
                display: block;
                width: 100px;
                height: 50px;
                margin-right: 20px;
                button {
                    width: 100%;
                    height: 100%;
                    background-color: #fff;
                    border: none;
                }
            }

            select {
                outline: none;
                border: none;
                text-align: center;
            }
        }

        .search {
            form {
                display: flex;
                input {
                    width: 90%;
                    height: 50px;
                    padding: 0 10px;
                    box-sizing: border-box;
                    border: none;
                    outline: none;
                }

                button {
                    width: 10%;
                    height: 50px;
                    background-color: #fff;
                    border: none;
                    padding: 0;
                    font-size: 25px;
                }
            }
        }

        .list {
            width: 100%;
            background-color: #fff;

            table {
                width: 100%;

                thead {
                    tr {
                        border-bottom: 1px solid #777;
                    }
                }

                th,
                td {
                    text-align: center;
                    padding: 10px 0;
                    width: calc(100% / 11);
                }

                td {
                    vertical-align: middle;
                    img {
                        width: 50px;
                        height: 50px;
                    }

                    select {
                        border: none;
                        outline: none;
                    }

                    button {
                        background-color: #fff;
                        border: none;
                    }
                }
            }
        }
    }
`;

const adminProduct = memo(() => {
    const [pop, setPop] = useState(true);
    const [category, setCategory] = useState(null);
    const categoryList = useRef([]);
    const [keyword, setKeyword] = useState({});

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const nowpage = Object.fromEntries(params).page;
    const dispatch = useDispatch();

    const { data, loading, error } = useSelector((state) => state.CategorySlice);
    const { data: data2, file, loading: loading2, error: error2 } = useSelector((state) => state.ProductSlice);

    const result = useMemo(() => {
        return { ...keyword, nowpage: nowpage };
    }, [nowpage, keyword]);

    console.log(result);

    useEffect(() => {
        dispatch(getList());
        dispatch(Productget(result));
    }, [result]);

    const onPop = useCallback(
        (e) => {
            setPop(!pop);
        },
        [pop],
    );

    const categoryChange = useCallback(
        (e) => {
            setCategory(e.target.value);
        },
        [category],
    );

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const current = e.target;

        const depth1 = current.major.value;
        const depth2 = current.minor.value;
        const depth1_id = current.major_id.value;
        const depth1Select = current.majorselect.value;
        const depth2Select = current.minorselect.value;

        dispatch(
            PostItem({
                depth1: depth1,
                depth2: depth2,
                depth1_id: depth1_id,
            }),
        );
        dispatch(
            DeleteItem({
                depth1_id: depth1Select,
                depth2_id: depth2Select,
            }),
        );
        setPop(true);
    }, []);

    const onDelete = useCallback((e) => {
        const id = e.currentTarget.dataset.id;
        dispatch(ProductDelete({ id: id }));
    }, []);

    const onCategoty = useCallback((e) => {
        const index = parseInt(e.currentTarget.dataset.num);
        categoryList.current.forEach((v, i) => {
            if (index == i) {
                v.classList.toggle("active");
            } else {
                v.classList.remove("active");
            }
        });
    }, []);

    const searchCategory = useCallback(
        (e) => {
            const depth2 = e.currentTarget.dataset.id;
            setKeyword({ ...keyword, depth2: depth2 });
        },
        [keyword],
    );

    const onSearch = useCallback(
        (e) => {
            e.preventDefault();
            const current = e.target;
            const params = {};
            params.search = current.search.value;
            setKeyword({ ...keyword, ...params });
        },
        [keyword],
    );

    const listCount = useCallback(
        (e) => {
            const count = e.target.value;
            setKeyword({ ...keyword, listCount: count });
        },
        [keyword],
    );

    const useAmount = useCallback(
        (e) => {
            const amount = e.target.value;
            const id = e.target.dataset.id;
            let params = {};
            data2.product.forEach((v, i) => {
                if (v.id == id) {
                    params.name = v.name;
                    params.price = v.price;
                    params.dsc = v.dsc;
                    params.depth2_id = v.depth2_id;
                    params.use_amount = amount;
                    params.id = v.id;

                    return;
                }
            });
            dispatch(ProductPut(params)).then((e) => {
                dispatch(Productget(result));
            });
        },
        [data2, result],
    );

    return (
        <Container>
            <Spinner visible={loading || loading2} />
            {
                <div className="containerBox">
                    <div className={classNames("overlay", { hidden: pop })}></div>
                    <div className={classNames("CategoryBox", { hidden: pop })}>
                        <div className="titleBox">
                            <p>카테고리 설정</p>
                            <button type="button" onClick={onPop}>
                                <FontAwesomeIcon icon={faX} />
                            </button>
                        </div>
                        <div className="contentBox">
                            <form onSubmit={onSubmit}>
                                <div className="add">
                                    <p>카테고리 추가</p>
                                    <div className="addBox">
                                        <div>
                                            <label htmlFor="major">상위 카테고리 추가</label>
                                            <input type="text" id="major" />
                                        </div>

                                        <div>
                                            <label htmlFor="minor">하위 카테고리</label>
                                            <select name="major_id">
                                                <option value="" hidden>
                                                    선택하세요
                                                </option>
                                                {data &&
                                                    data.cg1.map((v, i) => {
                                                        return (
                                                            <option value={v.id} key={i}>
                                                                {v.depth1}
                                                            </option>
                                                        );
                                                    })}
                                            </select>
                                            <input type="text" id="minor" />
                                        </div>
                                    </div>
                                </div>
                                <div className="delete">
                                    <p>카테고리 삭제</p>
                                    <div className="deleteBox">
                                        <select name="majorselect" onChange={categoryChange}>
                                            <option value="" hidden>
                                                선택하세요
                                            </option>
                                            {data &&
                                                data.cg1.map((v, i) => {
                                                    return (
                                                        <option value={v.id} key={i}>
                                                            {v.depth1}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                        <select name="minorselect">
                                            <option value="" hidden>
                                                선택하세요
                                            </option>
                                            {data &&
                                                data.cg2.map((v, i) => {
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
                                <button type="submit">저장</button>
                            </form>
                        </div>
                    </div>
                    <div className="category">
                        <ul>
                            <li onClick={onPop}>
                                카테고리 설정 <FontAwesomeIcon icon={faGear} />
                            </li>
                            <li data-id={null} onClick={searchCategory}>
                                전체 카테고리
                            </li>
                            {data &&
                                data.cg1.map((v, i) => {
                                    return (
                                        <div className="cList" key={i}>
                                            <li data-num={i} onClick={onCategoty} key={i}>
                                                {v.depth1}
                                            </li>
                                            <li className="sub" ref={(el) => (categoryList.current[i] = el)}>
                                                <ul>
                                                    {data &&
                                                        data.cg2.map((v2, i2) => {
                                                            if (v2.depth1_id == v.id && v2.depth2 !== null) {
                                                                return (
                                                                    <li key={i2} data-id={v2.depth2_id} onClick={searchCategory}>
                                                                        {v2.depth2}
                                                                    </li>
                                                                );
                                                            }
                                                        })}
                                                </ul>
                                            </li>
                                        </div>
                                    );
                                })}
                        </ul>
                    </div>
                    <div className="product">
                        <div className="top">
                            <NavLink to="/admin/product_add">
                                <button type="button">상품 추가</button>
                            </NavLink>
                            <select onChange={listCount}>
                                <option value={10}>10개씩 보기</option>
                                <option value={20}>20개씩 보기</option>
                                <option value={50}>50개씩 보기</option>
                            </select>
                        </div>
                        <div className="search">
                            <form onSubmit={onSearch}>
                                <input type="text" name="search" placeholder="검색할 상품명을 입력하세요." />
                                <button type="submit">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </form>
                        </div>
                        <div className="list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <input type="checkbox" />
                                        </th>
                                        <th>상품번호</th>
                                        <th>상품이미지</th>
                                        <th>상품명</th>
                                        <th>판매가</th>
                                        <th>카테고리</th>
                                        <th>상태</th>
                                        <th>등록일</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data2 &&
                                        isArray(data2.product) &&
                                        (data2.product.length != 0 ? (
                                            data2.product.map((v, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            <input type="checkbox" />
                                                        </td>
                                                        <td>{v.id}</td>
                                                        <td>
                                                            <img src={img} alt="상품" />
                                                        </td>
                                                        <td>
                                                            <NavLink to={`/admin/product_detail/${v.id}`}>{v.name}</NavLink>
                                                        </td>
                                                        <td>{parseInt(v.price).toLocaleString()}</td>
                                                        <td>{`${v.depth1} - ${v.depth2}`}</td>
                                                        <td>
                                                            <select data-id={v.id} defaultValue={v.use_amount} onChange={useAmount}>
                                                                <option value="Y">판매중</option>
                                                                <option value="N">품절</option>
                                                            </select>
                                                        </td>
                                                        <td>{dayjs(v.reg_date).format("YYYY-MM-DD")}</td>
                                                        <td>
                                                            <button type="button" data-id={v.id} onClick={onDelete}>
                                                                삭제하기
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan={9}>해당 상품이 없습니다.</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        {data2 && <Pagenation pagenation={data2["pagenation"]} />}
                    </div>
                </div>
            }
        </Container>
    );
});

export default adminProduct;
