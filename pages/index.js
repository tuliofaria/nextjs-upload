const Index = () => {
  const upload = async (evt) => {
    const formData = new FormData();
    formData.append("file", evt.target.files[0]);
    formData.append("test", "test");
    const res = await fetch("/api", {
      method: "POST",
      body: formData,
    });
    console.log(evt.target.files[0]);
  };
  return (
    <div>
      <h1>Upload</h1>
      <input type="file" onChange={upload} />
    </div>
  );
};
export default Index;
