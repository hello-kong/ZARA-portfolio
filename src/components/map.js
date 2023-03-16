import classNames from 'classnames';
import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import img from '../assets/img/marker.png';

const map = memo(({address, relayout, setShowAddr}) => {

	const ref = useRef();

	// 마커 담을 배열
	let markers = [];

	// 위도, 경도에 따른 거리 계산 함수
	const distance = useCallback((lat1, lon1, lat2, lon2) => {
		let theta = lon1 - lon2;
		let dist = 60 * 1.1515 * (180/Math.PI) * Math.acos(
			Math.sin(lat1 * (Math.PI/180)) * Math.sin(lat2 * (Math.PI/180)) + 
			Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * Math.cos(theta * (Math.PI/180))
		);

		return Math.round(dist*1.609344, 2);
	}, []);
	
	useEffect(() => {
		let searchResult = [];
		// 지도 표시 div
		const mapDiv = ref.current;

		// 주소-좌표 변환 객체
		const geocoder = new window.kakao.maps.services.Geocoder();

		// 주소로 좌표 검색
		geocoder.addressSearch(address, (result, status) => {
			if (status === window.kakao.maps.services.Status.OK) {

			// 지도 옵션
			let options = {
				center: new window.kakao.maps.LatLng(result[0].y, result[0].x),
				level: 3
				};
	
			// 지도
			const map = new window.kakao.maps.Map(mapDiv, options);
	
			// 장소 검색 객체
			const ps = new window.kakao.maps.services.Places();
	
			// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성.
			const infowindow = new window.kakao.maps.InfoWindow({zIndex:1});
	
			// 마커 이미지 생성
			const size = new window.kakao.maps.Size(50, 50);
			const imageOption = {offset: new window.kakao.maps.Point(27, 69)};
			const markerImage = new window.kakao.maps.MarkerImage(img, size, imageOption);
	
			// 마커 생성
			const displayMarker = (place) => {
				let marker = new window.kakao.maps.Marker({
					map: map,
					position: new window.kakao.maps.LatLng(place.y, place.x),
					image: markerImage
				});
				
			// 마커 클릭 시 설명 생성
			window.kakao.maps.event.addListener(marker, 'click', () => {
					infowindow.setContent('<div style="padding:5px;font-size:14px;">' + place.place_name + '<p style="font-size:12px;">' + place.address_name + '</p>' + '<p style="font-size:12px;">' + place.phone + '</p>' + '</div>');
					infowindow.open(map, marker);
				});
			};
	
			// 검색 완료 시 호출되는 콜백
			const search = (data, status, pagination) => {
				if (status === window.kakao.maps.services.Status.OK) {
	
					// 검색된 장소 위치를 기준으로 지도 범위 재설정
					let bounds = new window.kakao.maps.LatLngBounds();
	
					for (let i=0; i<data.length; i++) {
						if (distance(result[0].x, result[0].y, data[i].x, data[i].y) < 10) {
							searchResult.push(data[i]);
							displayMarker(data[i]);
							bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
						}
					}
					map.setBounds(bounds);
				}
				setShowAddr([...searchResult]);
			};
	
			// 자라 위치 검색
			ps.keywordSearch('ZARA', search);
			map.relayout();

			}
		});

	}, [address, relayout]);



	return (
		<div ref={ref} style={{width:'100%', height:'100%'}}>
			
		</div>
	);
});

export default map;
