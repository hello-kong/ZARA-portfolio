import React, { memo } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

// pop => true면 창이 보이고 false면 안 보이게 하는 상태값
// setPop => 상태값 pop을 다시 false로 바꿔주는 역할.
// addr => 주소를 담을 상태값. json 형태.
// setAddr => 상태값 addr을 변화시키는 함수.

const Postcode = memo(({pop, setPop, addr, setAddr}) => {
	const open = useDaumPostcodePopup();
	const close = () => {
		setPop(false);
	};
	const complete = (data) => {
		let roadAddr = data.roadAddress;
		let extraRoadAddr = '';
		let fullAddress = '';

		if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
			extraRoadAddr += data.bname;
		}

		if(data.buildingName !== '') {
			extraRoadAddr += (extraRoadAddr !== '' ? ',' + data.buildingName : data.buildingName);
		}

		if(extraRoadAddr !== ''){
			extraRoadAddr = '(' + extraRoadAddr + ')';
		}

		// 참고항목이 있을 경우
		if(roadAddr == ''){
			extraRoadAddr = '';
		}

		if (data.userSelectedType == 'R') {
			fullAddress = `${roadAddr} ${extraRoadAddr}`;
		} else {
			fullAddress = `${data.jibunAddress} ${extraRoadAddr}`;
		}

		setAddr(addr => {
			return {
				...addr,
				postcode: data.zonecode, // 우편번호
				roadAddress: roadAddr, // 도로명주소
				jibunAddress: data.jibunAddress, // 지번주소
				extraAddress: extraRoadAddr, // 부가주소
				fullAddress: fullAddress // 풀주소
			};
		});

		setPop(false);

	};

	if (pop) {
		open({onComplete: complete, onClose: close});
	}
});

Postcode.defaultProps = {
	pop: false,
	addr: {}
}

export default Postcode;