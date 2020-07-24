import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state=>state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            //내가 인증된 유저인지 확인하는 함수
            dispatch(auth()).then(response => {
                //로그인 실패
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                    //로그인 성공
                } else {
                    //인증안된 사람이 인증 필요한 페이지 들어갔을 때
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    //로그인 된 사람이 로그인/회원가입 페이지 들어갈때
                    else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })

        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


