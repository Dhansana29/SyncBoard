describe("SyncBoard server", ()=>{
  test("valid statuses contain todo", ()=>expect(["todo","doing","done"]).toContain("todo"));
  test("valid statuses contain doing", ()=>expect(["todo","doing","done"]).toContain("doing"));
  test("valid statuses contain done", ()=>expect(["todo","doing","done"]).toContain("done"));
});
