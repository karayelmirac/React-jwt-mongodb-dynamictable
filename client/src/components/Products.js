import {Table, Popconfirm } from "antd";
import PostService from "../services/post.service";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const { Column } = Table;

const Products = () => {
  const [privatePosts, setPrivatePosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    PostService.getAllProductsPosts().then(
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

  const handleDelete = async (key) => {
    const newData = privatePosts.filter((item) => item.product_name !== key);
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

    //post product
    let result = await fetch("http://localhost:5000/newproduct/", {
      method: "post",
      body: JSON.stringify(formJson),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result) {
      alert("Product saved succesfully");
    }
  };

  return (
    <div>
      <Table dataSource={privatePosts}>
        <Column
          title="Product Name"
          dataIndex="product_name"
          key="product_name"
        />
        <Column
          title="Product Category"
          dataIndex="product_category"
          key="product_category"
        />
        <Column
          title="Product Amount"
          dataIndex="product_amount"
          key="product_amount"
        />
        <Column title="Amount Unit" dataIndex="amount_unit" key="amount_unit" />
        <Column title="Company" dataIndex="Company" key="Company" />

        <Column
          title="Action"
          key="action"
          render={(_, record) =>
            privatePosts.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={(e) => handleDelete(record.product_name)}
              >
                <a>Delete</a>
              </Popconfirm>
            ) : null
          }
        />
      </Table>

      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <label>
          Product Name : <input name="product_name" />
        </label>
        <label>
          Product Category: <input name="product_category" />
        </label>
        <label>
          Product Amount: <input name="product_amount" />
        </label>
        <label>
          Amount Unit: <input name="amount_unit" />
        </label>

        <label>
          Company: <input name="Company" />
        </label>

        <button style={{ borderRadius: "10px" }} type="submit">
          Submit form
        </button>
      </form>
    </div>
  );
};
export default Products;
