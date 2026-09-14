import {render,screen} from "@testing-library/react";
import {describe,expect,test,vi} from "vitest";
import Column from "./Column";

const p={onEdit:vi.fn(),onDelete:vi.fn(),onMove:vi.fn()};

describe("Column",()=>{
  test("renders title",()=>{render(<Column title="To Do" tasks={[]} {...p}/>);expect(screen.getByText("To Do")).toBeInTheDocument();});
  test("renders empty",()=>{render(<Column title="Doing" tasks={[]} {...p}/>);expect(screen.getByText("No tasks")).toBeInTheDocument();});
  test("renders task",()=>{render(<Column title="Done" tasks={[{_id:"1",title:"Sample task",description:"",status:"done"}]} {...p}/>);expect(screen.getByText("Sample task")).toBeInTheDocument();});
});
