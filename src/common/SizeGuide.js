import React, { memo } from 'react';
import styled from 'styled-components';

const SizeGuideWrap = styled.div`
    padding: 30px;
    
    h1 {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 30px;
    }
    .sizeTable {
        th, tr, td {border: 2px solid white;}
        margin-bottom: 25px;
        h2 {
            background-color: black;
            color: white;
            padding: 4px;
            box-sizing: border-box;
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 15px;
        }
        .size {
            background-color: rgba(0,0,0,.1);
            width: 100%;
            text-align: center;
            font-size: 9px;
            font-weight: 800;
            .th1 {
                font-weight: 700;
                text-align: left;
                padding: 5px;
                box-sizing: border-box;
            }
            th {width: 100px;}
        }
        .sizePoint {
            th, tr, td {
                border-bottom: 1px solid rgba(0,0,0,.1);
            }
            width: 100%;
            text-align: center;
            font-size: 11px;
            th {
                width: 100px;
                
            }
            .th1 {
                text-align: left;
                padding: 5px;
                box-sizing: border-box;
            }
        }
    }
`;

const SizeGuide = memo(() => {
    return (
        <SizeGuideWrap>
            <h1>사이즈 가이드</h1>
            <div className='sizeTable'>
                <h2 className="sizeTitle">브라</h2>
                <table className="size">
                    <tr>
                        <th className="th1">사이즈</th>
                        <th>XS</th>
                        <th>S</th>
                        <th>M</th>
                        <th>L</th>
                        <th>XL</th>
                    </tr>
                    <tr>
                        <th className="th1">유럽 사이즈</th>
                        <th>-</th>
                        <th>70B</th>
                        <th>75B</th>
                        <th>80B</th>
                        <th>85B</th>
                    </tr>
                    <tr>
                        <th className="th1">미국/영국 사이즈</th>
                        <th>-</th>
                        <th>32B</th>
                        <th>34B</th>
                        <th>36B</th>
                        <th>38B</th>
                    </tr>
                </table>
                <table className="sizePoint">
                    <tr>
                        <th className="th1">가슴(cm)</th>
                        <th>80</th>
                        <th>85</th>
                        <th>90</th>
                        <th>95</th>
                        <th>100</th>
                    </tr>
                    <tr>
                        <th className="th1">가슴 하단(cm)</th>
                        <th>65</th>
                        <th>70</th>
                        <th>75</th>
                        <th>80</th>
                        <th>85</th>
                    </tr>
                </table>
            </div>
            <div className="sizeTable">
                <h2 className="sizeTitle">팬티</h2>
                <table className="size">
                    <tr>
                        <th className="th1">사이즈</th>
                        <th>S</th>
                        <th>M</th>
                        <th>L</th>
                    </tr>
                </table>
                <table className="sizePoint">
                    <tr>
                        <th className="th1">허리(cm)</th>
                        <th>65</th>
                        <th>70</th>
                        <th>80</th>
                    </tr>
                    <tr>
                        <th className="th1">골반(cm)</th>
                        <th>95</th>
                        <th>100</th>
                        <th>105</th>
                    </tr>
                </table>
            </div>
            <div className="sizeTable">
                <h2 className="sizeTitle">반지</h2>
                <table className="size">
                    <tr>
                        <th className="th1">사이즈</th>
                        <th>S</th>
                        <th>M</th>
                        <th>L</th>
                    </tr>
                    <tr>
                        <th className="th1">반지 사이즈</th>
                        <th>12</th>
                        <th>15</th>
                        <th>18</th>
                    </tr>
                </table>
                <table className="sizePoint">
                    <tr>
                        <th className="th1">직경(mm)</th>
                        <th>16,5</th>
                        <th>17,5</th>
                        <th>18,5</th>
                    </tr>
                </table>
            </div>
            <div className="sizeTable">
                <h2 className="sizeTitle">양말</h2>
                <table className="size">
                    <tr>
                        <th className="th1">사이즈</th>
                        <th>M</th>
                    </tr>
                </table>
                <table className="sizePoint">
                    <tr>
                        <th className="th1">발 길이(cm)</th>
                        <th>24-26</th>
                    </tr>
                </table>
            </div>
            <div className="sizeTable">
                <h2 className="sizeTitle">반려동물용 니트</h2>
                <table className="size">
                    <tr>
                        <th className="th1">사이즈</th>
                        <th>XXS</th>
                        <th>XS</th>
                        <th>S</th>
                        <th>M</th>
                    </tr>
                </table>
                <table className="sizePoint">
                    <tr>
                        <th className="th1">다리 뒤 둘레(cm)</th>
                        <th>33-37</th>
                        <th>37-41</th>
                        <th>45-49</th>
                        <th>47-51</th>
                    </tr>
                    <tr>
                        <th className="th1">등 길이(cm)</th>
                        <th>24-28</th>
                        <th>27-31</th>
                        <th>31-35</th>
                        <th>34-38</th>
                    </tr>
                    <tr>
                        <th className="th1">목 둘레(cm)</th>
                        <th>20-24</th>
                        <th>22-26</th>
                        <th>24-28</th>
                        <th>26-30</th>
                    </tr>
                </table>
            </div>
            <div className="sizeTable">
                <h2 className="sizeTitle">반려동물용 패딩/레인 코트</h2>
                <table className="size">
                    <tr>
                        <th className="th1">사이즈</th>
                        <th>XXS</th>
                        <th>XS</th>
                        <th>S</th>
                        <th>M</th>
                        <th>L</th>
                        <th>XL</th>
                        <th>XXL</th>
                    </tr>
                </table>
                <table className="sizePoint">
                    <tr>
                        <th className="th1">가슴 둘레(cm)</th>
                        <th>28-34</th>
                        <th>39-45</th>
                        <th>50-57</th>
                        <th>62-70</th>
                        <th>73-84</th>
                        <th>83-100</th>
                        <th>95-105</th>
                    </tr>
                    <tr>
                        <th className="th1">등 길이(cm)</th>
                        <th>22-26</th>
                        <th>31-35</th>
                        <th>39-44</th>
                        <th>47-57</th>
                        <th>58-65</th>
                        <th>70-77</th>
                        <th>73-78</th>
                    </tr>
                    <tr>
                        <th className="th1">목 둘레(cm)</th>
                        <th>26-29</th>
                        <th>29-33</th>
                        <th>33-37</th>
                        <th>37-41</th>
                        <th>41-46</th>
                        <th>46-50</th>
                        <th>50-55</th>
                    </tr>
                </table>
            </div>
            <div className="sizeTable">
                <h2 className="sizeTitle">반려동물용 반다나</h2>
                <table className="size">
                    <tr>
                        <th className="th1">사이즈</th>
                        <th>XS</th>
                        <th>S</th>
                        <th>M</th>
                        <th>L</th>
                    </tr>
                </table>
                <table className="sizePoint">
                    <tr>
                        <th className="th1">목 둘레(cm)</th>
                        <th>17-25</th>
                        <th>22-30</th>
                        <th>27-35</th>
                        <th>32-40</th>
                    </tr>
                </table>
            </div>
            <div className="sizeTable">
                <h2 className="sizeTitle">더블 사이즈 반려동물 하네스</h2>
                <table className="size">
                    <tr>
                        <th className="th1">사이즈</th>
                        <th>S-M</th>
                        <th>M-L</th>
                    </tr>
                </table>
                <table className="sizePoint">
                    <tr>
                        <th className="th1">목 둘레(cm)</th>
                        <th>22-34</th>
                        <th>33-42</th>
                    </tr>
                    <tr>
                        <th className="th1">다리 뒤 둘레(cm)</th>
                        <th>24-42</th>
                        <th>28-48</th>
                    </tr>
                </table>
            </div>
            <div className="sizeTable">
                <h2 className="sizeTitle">반려동물 하네스</h2>
                <table className="size">
                    <tr>
                        <th className="th1">사이즈</th>
                        <th>S</th>
                        <th>M</th>
                        <th>L</th>
                        <th>XL</th>
                    </tr>
                </table>
                <table className="sizePoint">
                    <tr>
                        <th className="th1">목 둘레(cm)</th>
                        <th>37-48</th>
                        <th>45-56</th>
                        <th>55-66</th>
                        <th>65-84</th>
                    </tr>
                    <tr>
                        <th className="th1">다리 뒤 둘레(cm)</th>
                        <th>36-61</th>
                        <th>38-71</th>
                        <th>43-86</th>
                        <th>53-97</th>
                    </tr>
                </table>
            </div>
            <div className="sizeTable">
                <h2 className="sizeTitle">반려동물 목걸이</h2>
                <table className="size">
                    <tr>
                        <th className="th1">사이즈</th>
                        <th>XXS</th>
                        <th>XS</th>
                        <th>S</th>
                        <th>M</th>
                        <th>L</th>
                        <th>XL</th>
                    </tr>
                </table>
                <table className="sizePoint">
                    <tr>
                        <th className="th1">목 둘레(cm)</th>
                        <th>21-26</th>
                        <th>26-33</th>
                        <th>31-38</th>
                        <th>36-43</th>
                        <th>41-48</th>
                        <th>46-53</th>
                    </tr>
                </table>
            </div>
        </SizeGuideWrap>
    );
});

export default SizeGuide;