import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MyPageLayout from "../component/MyPageLayout";
import Header from "../component/Header";
import {
  Container, FormWrapper, Title, Input, Button, Select,
} from "../styles/common";
import { http } from "../api/axios";

const Label = ({ children }) => (
  <div style={{ fontSize: 15, fontWeight: 600, marginTop: 6 }}>{children}</div>
);

export default function MyPage() {
  const stored = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "{}"); }
    catch { return {}; }
  })();

  const user = {
    id: stored.userId ?? stored.id ?? stored.userSeq ?? stored.seq ?? stored.uid ?? "",
    name: stored.name ?? "",
    email: stored.email ?? "",
    birth: stored.birth ?? stored.birthday ?? "",
    passwd: stored.passwd ?? "",
  };

  const [birthStr, setBirthStr] = useState(user.birth || ""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBirthday = async () => {
      if (!user.id) return; 
      try {
        // 백엔드: /api/v1/users/{userId} 가 UserResponseDTO(email,name,birthday) 반환
        const { data } = await http.get(`/api/v1/users/${user.id}`);
        const birthday = data?.birthday || ""; 
        if (birthday) {
          setBirthStr(birthday);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...stored, birth: birthday, birthday })
          );
        }
      } catch (err) {
        console.error("생년월일 불러오기 실패:", err?.response?.data || err);
      }
    };
    fetchBirthday();
  }, []);

  const [, y = "", m = "", d = ""] =
    (birthStr || "").match(/^(\d{4})-(\d{2})-(\d{2})$/) || [];

  return (
    <>
      <MyPageLayout>
        <FormWrapper style={{ width: 520 }}>
          <Title>회원정보 확인</Title>

          <Label>이름</Label>
          <Input
            style={{
              backgroundColor: "#F7F7FB",
              height: "35px",
              border: "none",
              marginTop: "10px",
            }}
            value={user.name}
            readOnly
          />

          <Label>이메일</Label>
          <Input
            style={{
              backgroundColor: "#F7F7FB",
              height: "35px",
              border: "none",
              marginTop: "10px",
            }}
            value={user.email}
            readOnly
          />

          <Label>생년월일</Label>
          <div style={{ display: "flex", gap: 8 }}>
            <Input
              style={{
                backgroundColor: "#F7F7FB",
                height: "35px",
                border: "none",
                marginTop: "10px",
                width: 120,
              }}
              readOnly
              value={y ? `${y} 년` : ""}
            />
            <Input
              readOnly
              style={{
                backgroundColor: "#F7F7FB",
                height: "35px",
                border: "none",
                marginTop: "10px",
                width: 120,
              }}
              value={m ? `${parseInt(m, 10)} 월` : ""}
            />
            <Input
              readOnly
              style={{
                backgroundColor: "#F7F7FB",
                height: "35px",
                border: "none",
                marginTop: "10px",
                width: 120,
              }}
              value={d ? `${parseInt(d, 10)} 일` : ""}
            />
          </div>

          <Button
            type="button"
            onClick={() => navigate("/mypage/edit")}
            style={{ marginTop: 16 }}
          >
            수정
          </Button>
        </FormWrapper>
      </MyPageLayout>
    </>
  );
}
