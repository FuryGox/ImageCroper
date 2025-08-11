const Test = () => {
    return (
        <div style={{ backgroundColor: '#000', width: '100%', height: '100vh' }}>


            <div style={{ display: 'flex', position: 'relative', flexDirection: 'row', zIndex: 1, opacity: 100, backgroundImage: 'url(Vector_2646.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 0.5 = độ mờ
                    zIndex: 1
                }} />
                <div style={{ width: '65%', height: 'calc(100vh)', float: 'left', padding: '20px', zIndex: 2 }}>
                    <div className="mx-auto" style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', height: '100%', width: '90%' }}>
                        <h1 style={{ color: 'yellow', fontSize: '2.5rem', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
                            Biến ý tưởng đầu tư thành Chỉ Số giao dịch chuyên chiệp chỉ trong 3 Bước !
                        </h1>
                        <p style={{
                            color: '#fff', fontSize: '1.75rem',
                            fontWeight: '600', lineHeight: '1.75rem', marginBottom: '20px', lineClamp: '2', textOverflow: 'ellipsis'
                        }}>CCPI trao quyền cho bạn tự thiết kế – backtest – công bố chỉ số đầu tư chuyên nghiệp, từ ý tưởng đến showroom chỉ trong vài phút​.</p>
                        <ul style={{ listStyleType: 'none', paddingLeft: 40 }}>
                            <li style={{ color: '#c1e4f5', fontSize: '1.2rem', marginBottom: '10px' }}>
                                <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: 'cyan', borderRadius: '50%', marginRight: '10px' }}></span>
                                Tự thiết kế chỉ số đầu tư của riêng bạn
                            </li>
                            <li style={{ color: '#c1e4f5', fontSize: '1.2rem', marginBottom: '10px' }}>
                                <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: 'cyan', borderRadius: '50%', marginRight: '10px' }}></span>
                                Backtest chỉ số đầu tư của bạn
                            </li>
                            <li style={{ color: '#c1e4f5', fontSize: '1.2rem', marginBottom: '10px' }}>
                                <span style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: 'cyan', borderRadius: '50%', marginRight: '10px' }}></span>
                                Công bố chỉ số đầu tư của bạn
                            </li>
                        </ul>
                        <span style={{ color: '#fff', fontSize: '1.25rem', }}>
                            <span>
                                Tặng ngay <span style={{ color: '#47d45a' }}> 30 điểm trải nghiệm</span> + <span style={{ color: '#47d45a' }}> 1 chỉ số backtest miễn phí</span> khi đăng ký!
                            </span>
                        </span>
                        <span style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '20px' }}>
                            Bắt đầu tạo chỉ số đầu tiên <span style={{ color: '#47d45a' }}> miễn phí </span> – và trở thành người tiên phong trong thế hệ <span style={{ color: '#47d45a' }}>nhà sáng tạo chỉ số mới.</span>
                        </span>
                    </div>
                </div>
                <div style={{ padding: '20px', height: 'calc(100vh)', width: '35%' }}>
                    <h1>Test Page</h1>
                    <p>This is a test page with a header and a content area.</p>
                </div>
            </div>

        </div>
    );
}
export default Test;