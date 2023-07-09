import {Table, Popconfirm } from "antd";
import PostService from "../services/post.service";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
const { Column } = Table;

const Companies = ({ setLengthData, setData }) => {
  const [privatePosts, setPrivatePosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    PostService.getAllCompaniesPosts().then(
      (response) => {
        setPrivatePosts(response.data);
      },
      (error) => {
        console.log("Private page", error.response);
        // Invalid token
        if (error.response && error.response.status === 403) {
          AuthService.logout();
          navigate("/login");
          window.location.reload();
        }
      }
    );
  }, []);
  setLengthData(privatePosts.length);
  setData(privatePosts);

  const handleDelete = (key) => {
    const newData = privatePosts.filter(
      (item) => item.company_legal_number !== key
    );
    setPrivatePosts(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    const arr = [];
    arr.push(formJson);
    setPrivatePosts([...privatePosts, ...arr]);

    //post company
    let result = await fetch("http://localhost:5000/newcompanies/", {
      method: "post",
      body: JSON.stringify(formJson),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      alert("Company saved succesfully");
    }
  };

  return (
    <div>
      <Table dataSource={privatePosts.reverse()}>
        <Column
          title="Company Name"
          dataIndex="company_name"
          key="company_name"
        />
        <Column
          title="Company Legal Number"
          dataIndex="company_legal_number"
          key="company_legal_number"
        />
        <Column
          title="Incorporation
        Country"
          dataIndex="incorporation_country"
          key="incorporation_country"
        />
        <Column title="Website" dataIndex="Website" key="Website" />

        <Column
          title="Action"
          key="action"
          render={(_, record) =>
            privatePosts.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={(e) => handleDelete(record.company_legal_number)}
              >
                <a>Delete</a>
              </Popconfirm>
            ) : null
          }
        />
      </Table>

      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <label>
          Company Name: <input name="company_name" />
        </label>
        <label>
          Company Legal Number: <input name="company_legal_number" />
        </label>
        <label>
          Incorporation Country: <input name="incorporation_country" />
        </label>
        <label>
          Website: <input name="Website" />
        </label>

        <button style={{ borderRadius: "10px" }} type="submit">
          Submit form
        </button>
      </form>
    </div>
  );
};

export default Companies;
