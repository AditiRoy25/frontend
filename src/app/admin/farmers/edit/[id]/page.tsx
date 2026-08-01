updateFarmer: builder.mutation<
  SingleResponse<IFarmer>,
  {
    id: string;
    body: Partial<IFarmer>;
  }
>({
  query: ({ id, body }) => ({
    url: `/admin/farmers/${id}`,
    method: "PUT",
    body,
  }),

  invalidatesTags: (_result, _error, { id }) => [
    "Farmers",
    {
      type: "Farmers",
      id,
    },
  ],
}),