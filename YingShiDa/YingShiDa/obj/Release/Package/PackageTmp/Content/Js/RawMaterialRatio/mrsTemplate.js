<%for (int i = 0, ilen = data; i < ilen; ++){%>
    <tr>
        <td><%=name%></td>
        <td><%=rarcode%></td>
        <td>
            <select name="" class="form-control">
                <%for (int j = 0; j < length; j++){%>
                <option value="<%=ov %>"><%=ot %></option>
                <% } %>
            </select>
        </td>
        <td>
            <input type="text" value="0.00" class="form-control" />
        </td>
        <td>
            <a href="javascript:void(0);" class="color-light-blue">添加</a>
        </td>
    </tr>
<% } %>