// import logo from './logo.svg';
import {Button, Empty, Radio, Table,Spin} from "antd";
import {useState, useEffect } from 'react'

//useState: allow us to manage stage in application

//useEffect:

import  { getAllStudents, deleteStudent } from "./client";
import { Layout, Menu, Breadcrumb, Popconfirm} from 'antd';

import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    LoadingOutlined,
    PlusOutlined
} from '@ant-design/icons';

import StudentDrawerForm from "./StudentDrawerForm";

import './App.css';



const {Header, Content, Footer, Sider} = Layout;
const { SubMenu } = Menu;

const removeStudent = (studentId,callback) => {
    console.log("Student id is", studentId)
    deleteStudent(studentId)
    .then(()=>{
        callback();
    }).catch(err =>{
        console.log("Cannot delete here due to:",err)
    })
}
const columns = fetchStudents => [

    {
        title: 'Id',
        dataIndex: 'id',
        key:'id',
        
    },
    {
        title:'Name',
        dataIndex:'name',
        key:'name'
    },
    {
        title:'Email',
        dataIndex:'email',
        key:'email'
    },
    {
        title:'Gender',
        dataIndex:'gender',
        key:'gender'
    },    {
        title:'',
        key:'action',
        dataIndex: 'action',
        render: (text, student) => 
        <Popconfirm
            title="Delete the task"
            description={`Are you sure to delete this ${student.name}`}
            okText="Yes"
            cancelText="No"
            onConfirm={()=>removeStudent(student.id,fetchStudents)}
        >
            <a href="#">Delete</a>
        </Popconfirm>

         
    }


]

const antIcon = <LoadingOutlined style={{ fontSize: 24}} spin/>
function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchStudents = () =>
        getAllStudents()
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setStudents(data);
            setFetching(false);
        }).catch(err => {console.log(err.response)
                      err.response.json()
                      .then(res=>{
                          console.log(res);
                      });
                  }).finally(()=>setFetching(false));


    useEffect(() => {
        console.log("component is mounted")
        fetchStudents();
    },[]);
    
    const renderStudents = () => {
        if(fetching){
            return <Spin indicator={antIcon} />
        }
        if (students.length <= 0){
            return <Empty/>
        }
        return <>
            <StudentDrawerForm showDrawer={showDrawer} setShowDrawer={setShowDrawer} fetchStudents={fetchStudents}/>

            <Table
                dataSource={students}
                columns={columns(fetchStudents)}
                bordered
                title={()=> 
                    <Button
                        onClick={() => setShowDrawer(!showDrawer)} 
                        type="primary" shape="round" icon={<PlusOutlined/>} size="large">
                        Add New Student
                    </Button>
                }
                pagination={{pageSize:50}}
                scroll={{y:1000}}
                rowKey={(student) => student.id}
            />;
        </>


    }





  // return <p>{students.length}</p>;
  
    // return (
    // <div className="App">
    //     <Button type='primary'>Hello</Button>
    //     <br`/>
    //     <Radio.Group value='large'>
    //       <Radio.Button value="large">Large</Radio.Button>
    //       <Radio.Button value="default">Default</Radio.Button>
    //       <Radio.Button value="small">Small</Radio.Button>
    //     </Radio.Group>        
    // </div>
  // );
  return <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed}
            onCollapse={setCollapsed}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                  Option 1
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                  Option 2
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                  <Menu.Item key="3">Tom</Menu.Item>
                  <Menu.Item key="4">Bill</Menu.Item>
                  <Menu.Item key="5">Alex</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                  <Menu.Item key="6">Team 1</Menu.Item>
                  <Menu.Item key="8">Team 2</Menu.Item>
              </SubMenu>
              <Menu.Item key="9" icon={<FileOutlined />}>
                  Files
              </Menu.Item>
          </Menu>
      </Sider>
      <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  <Breadcrumb.Item>Hey</Breadcrumb.Item>

              </Breadcrumb>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                  {renderStudents()}
              </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>By Cody Tran</Footer>
      </Layout>
    </Layout>
}

export default App;
