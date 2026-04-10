import React from 'react';

export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', textAlign: 'center', direction: 'rtl' }}>
      <h1 style={{ color: '#d32f2f' }}>نظام فحص وصيانة NFPA 25</h1>
      <p>مرحباً بك يا أستاذ عمر في نظامك الذكي.</p>
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button style={{ padding: '10px 20px', cursor: 'pointer' }}>إضافة صمام جديد</button>
        <button style={{ padding: '10px 20px', cursor: 'pointer' }}>سجل الفحوصات</button>
      </div>
      <p style={{ marginTop: '30px', color: '#666' }}>إذا ظهرت هذه الصفحة، فالمشروع يعمل بنجاح!</p>
    </div>
  );
}
