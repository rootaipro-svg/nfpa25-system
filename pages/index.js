import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '50px', fontFamily: 'Arial', textAlign: 'center', direction: 'rtl' }}>
      <h1 style={{ color: '#d32f2f', fontSize: '32px' }}>نظام NFPA 25 الذكي</h1>
      <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '10px', display: 'inline-block' }}>
        <p style={{ fontSize: '20px' }}>مرحباً بك يا أستاذ عمر</p>
        <p>تم ربط النظام بنجاح، يمكنك الآن البدء بإضافة المعدات.</p>
      </div>
      <div style={{ marginTop: '30px' }}>
         <Link href="/add-valve">
           <button style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer', background: '#d32f2f', color: 'white', border: 'none', borderRadius: '5px' }}>
             إضافة صمام جديد وتوليد QR
           </button>
         </Link>
      </div>
    </div>
  );
}
