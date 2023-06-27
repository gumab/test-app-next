import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useState} from "react";
import {Contacts, Alarm} from "@kurlybae/kurly-web-sdk";
import {isWebview} from "../src/util/getDevice";
import {add, format} from 'date-fns'

export default function Test() {
    const [contact, setContact] = useState<Contacts.Contact | undefined>()
    const [pushTitle, setPushTitle] = useState('⏰라이브 방송이 곧 시작합니다!⏰')
    const [pushMessage, setPushMessage] = useState('최대 50% 할인에 20% 쿠폰까지, 역대급 할인 혜택 LIVE💜')
    const [pushLink, setPushLink] = useState('kurly://open?url=https://www.stg.kurly.com/m2/event/kurlyEvent.php?htmid=event/live/grip/brand_kurly&svID=kurly&rvID=qlgnk2wk3xr2m08o')
    const [alarmText, setAlarmText] = useState('')
    const onClickContactTest = async () => {
        if (!isWebview()) {
            alert('실행가능한 환경이 아님')
            return
        }
        const contact = await Contacts.getContacts()
        setContact(contact)
    }

    const onClickAlarmTest = async () => {
        if (!isWebview()) {
            alert('실행가능한 환경이 아님')
            return
        }
        const pushDate =add(new Date(), {seconds: 3})
        const id = format(pushDate, 'yyyy-MM-dd HH:mm:ss');
        Alarm.addAlarm({
            id: id,
            title: pushTitle,
            message: pushMessage,
            link: pushLink,
            time: pushDate,
            image: 'https://img-cf-dev.kurly.com/push/2305/14.png',
        })
        const alarmParams = await Alarm.getAlarm()
        setAlarmText(JSON.stringify(alarmParams))
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Tester</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
            </Head>

            <main style={{width: '100%'}}>
                <button onClick={() => window.location.reload()}>새로고침</button>
                <div style={{background: 'pink', padding: '10px'}}>
                    <h4>연락처 가져오기 테스트</h4>
                    <p style={{fontSize: 10}}>주문서 웹뷰에서만 확인 가능</p>
                    <button onClick={onClickContactTest}>가져오기</button>
                    {contact && <p>
                        name : {contact.name}<br/>
                        phone : {contact.phone}
                    </p>}
                </div>

                <div style={{background: 'lightyellow', padding: '10px'}}>
                    <h4>푸시테스트</h4>
                    <p style={{fontSize: 10}}>3초 뒤 푸시 알림</p>
                    <label>타이틀</label>
                    <input type="text" placeholder="타이틀" value={pushTitle}
                           onChange={e => setPushTitle(e.currentTarget.value)}/>
                    <br/>
                    <label>메시지</label>
                    <input type="text" placeholder="메시지" value={pushMessage}
                           onChange={e => setPushMessage(e.currentTarget.value)}/>
                    <br/>
                    <label>링크</label>
                    <input type="text" placeholder="링크" value={pushLink}
                           onChange={e => setPushLink(e.currentTarget.value)}/>
                    <br/>
                    <button onClick={onClickAlarmTest}>푸시 테스트</button>
                    {alarmText && <p>{alarmText}</p>}
                </div>
            </main>

            <footer>
            </footer>
        </div>
    )
}
