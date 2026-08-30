import {render,screen} from "@testing-library/react";
import Column from "./Column";
const props={onMove:()=>{},onDelete:()=>{},onEdit:()=>{}};
test("renders title",()=>{render(<Column title="To Do" tasks={[]} {...props}/>);expect(screen.getByText(/To Do/)).toBeInTheDocument()});
test("shows empty message",()=>{render(<Column title="Doing" tasks={[]} {...props}/>);expect(screen.getByText("No tasks")).toBeInTheDocument()});
test("renders task",()=>{render(<Column title="Done" tasks={[{_id:"1",title:"Report",description:"Finish",status:"done",version:0}]} {...props}/>);expect(screen.getByText("Report")).toBeInTheDocument()});
