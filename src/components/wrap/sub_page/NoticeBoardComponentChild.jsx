import React from 'react';

export default function NoticeBoardComponentChild ({공지사항}) {
    return (
        <ul>

            {
                공지사항.map((item, idx)=>{
                    return(
                        <li key={idx}>
                            <span>{item.번호}</span>
                            <span>{item.제목}</span>
                            <span>{item.작성자}</span>
                            <span>{item.작성일}</span>
                        </li>
                    )
                })
            }
           
        </ul>
    );
};

