# React Shop

#### 사용한 것
- React Hooks, Redux, Redux, Express, Multer, Mongo DB
- Development Tool :Git, AWS (S3)

#### 주요 기능
- 회원가입/로그인
- 상품 업로드
- 상품 상세 페이지
- 장바구니에 담기
- 상품 검색
- 원하는 조건에 맞는 필터 기능

#### 상품 업로드
<br />

　　　　　 ![업로드](https://github.com/superfly9/react-travel-shop/blob/master/img/upload.gif)
   
 - multer-s3를 사용해 aws-s3에 이미지 파일 업로드
 - 상품 이미지를 3개까지 업로드 가능 
 - 이미 업로드한 상품이미지 클릭시 삭제
 
#### 상세 페이지 
<br/>

　　　　　![상세페이지](https://github.com/superfly9/react-travel-shop/blob/master/img/productPage.gif)

- react-image-gallery이용하여 이미지를 넘겨볼 수 있게 함
- 로그인 했을 시 카트에 원하는 상품을 담을 수 있게함

#### 검색 기능
<br/>

　　　　　![검색기능](https://github.com/superfly9/react-travel-shop/blob/master/img/search.gif)
     
 - 페이지 상단 input창 검색어와 일치하는 제목을 가진 상품 보여줌
 - mongoDB가 단어별로 검색을 할 수 있도록 RegExp를 검색 조건에 추가
     
#### 필터 기능
<br/>

　　　　　![검색기능](https://github.com/superfly9/react-travel-shop/blob/master/img/filter.gif)
 
 - 가고 싶은 지역별/가격별로 검색이 가능하도록 필터 설정
 - 상품이 40만원이상이면 하나의 가격대로 묶어버림
     
#### 장바구니 기능
<br/>

　　　　　![장바구니 추가](https://github.com/superfly9/react-travel-shop/blob/master/img/cart.gif)
    
 - 로그인한 유저가 상품 상세 페이지서 장바구니 버튼 클릭시 추가되게 함
 - 장바구니 페이지에서 상품 삭제 가능 및 상품 가격의 총합이 나타남

<br />

