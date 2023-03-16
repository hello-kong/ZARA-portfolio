import React, { memo } from "react";
import styled from "styled-components";

import Chart from "../components/ChartView";

// 데이터 가지고 와서 차트 그리기, 날짜 바뀌면 데이터 다시 불러와서 차트 그릴 예정

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 1%;
    box-sizing: border-box;

    h2 {
        text-align: center;
        font-size: 25px;
        margin: 30px 0;
        color: #aaa;
    }

    .date {
        display: flex;
        justify-content: center;
        margin-bottom: 30px;

        .start,
        .end {
            width: 200px;

			label {
				font-size: 14px;
			}

            input {
                width: 200px;
                height: 30px;
            }
        }

		.start {
			margin-right: 20px;
		}
    }

    .chart {
        width: 100%;
        height: 700px;
        background-color: #060;
    }
`;

const adminStats = memo(() => {
    return (
        <Container>
            <h2>날짜별 매출 현황</h2>
            <div className="date">
                <div className="start">
                    <label htmlFor="startdate">시작날짜</label>
                    <input type="date" id="startdate" />
                </div>
                <div className="end">
                    <label htmlFor="enddate">종료날짜</label>
                    <input type="date" id="enddate" />
                </div>
            </div>
            <div className="chart"></div>
        </Container>
    );
});

export default adminStats;
