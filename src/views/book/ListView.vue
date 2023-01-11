<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
import { useBookStore } from "@/stores/book";

const columns = [
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => <RouterLink :to={`/book/${record._id}`}>{{title}}</RouterLink>,
    },
    {
      title: '副标题',
      dataIndex: 'sub_title',
      key: 'sub_title',
    },
    {
      title: '封面',
      dataIndex: 'binding',
      key: 'binding',
      render: url => <img src={url} alt="" width={100} />,
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
      key: 'publisher',
    },
    {
      title: '出版时间',
      dataIndex: 'publish_date',
      key: 'publish_date',
      render: val => new Date(val).toLocaleDateString(),
    },
    {
      title: '操作',
      dataIndex: '_id',
      key: 'id',
      render: (id) => (
        <span>
          // <Edit id={id} />
          <a-divider type="vertical" />
          // <a href='#' :click={() => handleDelete(id)}>删除</a>
        </span>
      ),
    },
  ];

export default defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
  },
  setup() {
    const bookStore = useBookStore();

    return {
      bookStore,
      data,
      columns,
    };
  },
});
</script>

<template>
  <a-table :columns="columns" :data-source="data">
    <template #headerCell="{ column }">
      <template v-if="column.key === 'name'">
        <span>
          <smile-outlined />
          Name
        </span>
      </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link">
            More actions
            <down-outlined />
          </a>
        </span>
      </template>
    </template>
  </a-table>
</template>
