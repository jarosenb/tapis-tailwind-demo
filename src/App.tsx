import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

const longString =
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.";


interface LayoutProps {
  left?: React.ReactNode,
  right?: React.ReactNode,
  top?: React.ReactNode,
  bottom?: React.ReactNode,
}
const Layout: React.FC<LayoutProps> = ({left, right, top, bottom}) => (
    <div className="flex flex-col flex-1">
      {top}
      <div className="md:flex md:flex-row flex-1 flex-col">
        {left}
        {right}
      </div>
      {bottom}
    </div>
)

const AuthLayout = () => {
  const topBar = <div className="h-12 flex flex-col justify-center border-b border-gray-600 text-lg"> <span>Dashboard for https://tacc.tapis.io</span> </div>

  const authContent = (
    <div className="container py-5 space-y-5 items-center px-1">
      <div>
        <div className="flex space-x-1 pb-2 items-center">
          <span className="font-bold text-sm">Username</span>
          <span className="rounded bg-red-500 font-bold text-white px-1" style={{fontSize: "10.5px"}}>Required</span>
        </div>
        <div className="w-full">
          <input className="shadow border border-gray-400 w-full py-1 px-2 text-gray-700 leading-tight focus:ring focus:outline-none focus:ring-purple-200"></input>
        </div>
      </div>
      <div>
        <div className="flex space-x-1 pb-2 items-center">
          <span className="font-bold text-sm">Password</span>
          <span className="rounded bg-red-500 font-bold text-white px-1" style={{fontSize: "10.5px"}}>Required</span>
        </div>
        <div className="w-full">
          <input className="shadow border border-gray-400 w-full py-1 px-2 text-gray-700 leading-tight focus:ring focus:outline-none focus:ring-purple-200" type="password"></input>
        </div>
      </div>
      <div>
        <button className="rounded bg-purple-400 py-2 px-3 text-white active:bg-gray-600">Log In</button>
      </div>
    </div>
  )

  return <div className="pl-5 flex-1"><Layout top={topBar} right={authContent}/></div>

}

const TableRow = () => (
  <div className="flex flex-row h-12 space-x-4 hover:bg-gray-100">
      <div className="flex flex-col justify-center w-40 overflow-y-auto"><span className="md:truncate whitespace-nowrap">{longString}</span></div>
      <div className="flex flex-1 flex-col justify-center "><span className="md:truncate whitespace-nowrap">{longString}</span></div>
      <div className="flex flex-1 flex-col justify-center"><span className="md:truncate whitespace-nowrap">{longString}</span></div>
    </div>
)

const InnerLayout = () => {
  const topBar = <div className="h-12 p-3 flex flex-col justify-center border-b border-gray-600 text-lg"> <span>Dashboard for https://tacc.tapis.io</span> </div>
  const buttonBar = <div className="h-12 p-3 flex flex-row justify-between border-b border-gray-600 text-lg"> <span>Listing header and buttons</span> <span>stuff on the right</span> </div>
  const leftNav = <div className="md:w-52 bg-gray-100 w-full md:h-full h-10 flex md:flex-col md:pt-5 border-r border-gray-600">
    <NavLink className="p-3 md:pl-10 hover:bg-purple-200 text-gray-500 text-xs font-medium" to="/listing" exact activeClassName="bg-purple-200">Listing 1</NavLink>
    <NavLink className="p-3 md:pl-10 hover:bg-purple-200 text-gray-500 text-xs font-medium" to="/listing/2" activeClassName="bg-purple-200">Listing 2</NavLink>
  </div>
  const content = (
    <div className="flex flex-col flex-1 pl-3">
      <div>
        <div className="flex flex-row h-12 space-x-4 sticky top-0 bg-white border-b border-gray-600">
          <div className="flex flex-col justify-end w-40"><span className="truncate">Fixed Width</span></div>
          <div className="flex flex-1 flex-col justify-end "><span className="truncate">Flex Column 1</span></div>
          <div className="flex flex-1 flex-col justify-end"><span className="truncate">Flex Column 2</span></div>
        </div>
        {Array(20).fill(undefined).map((_, idx) => <TableRow key={idx}/>)}
      </div>
    </div>  
  )


  return <Layout top={topBar} left={leftNav} right={<Layout top={buttonBar} left={content} right={content}/>}/>
}

function App() {

  const topBar = <div className="h-12 flex flex-col pl-4 justify-center border-b border-gray-600 text-lg"> <span>TAPIS UI</span> </div>
  const bottomBar = <div className="h-16 bg-green-700"></div>
  const leftNav = <div className="md:w-52 bg-gray-100 w-full md:h-full h-10 flex md:flex-col md:pt-5 border-r border-gray-600 overflow-y-auto">
    <NavLink className="p-3 md:pl-10 hover:bg-purple-200 text-gray-500 text-xs font-medium whitespace-nowrap" to="/" exact activeClassName="bg-purple-200">Login Page</NavLink>
    <NavLink className="p-3 md:pl-10 hover:bg-purple-200 text-gray-500 text-xs font-medium whitespace-nowrap" to="/listing" activeClassName="bg-purple-200">Fake Listing</NavLink>
  </div>
  const rightelement = (
    <Switch>
      <Route exact path="/">
        <AuthLayout/>
      </Route>
      <Route path="/listing">
        <InnerLayout/>
      </Route>
    </Switch>
    )
  return <Router><div className="h-screen flex">
    <Layout top={topBar} left={leftNav} right={rightelement}></Layout>
  </div></Router>
}

export default App;
