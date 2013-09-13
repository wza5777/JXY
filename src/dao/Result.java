package dao;

import java.io.Serializable;
import java.util.Iterator;
import java.util.List;

public class Result<T> implements Iterable<T>, Serializable {

	private static final long serialVersionUID = -3227685040036327514L;

	private int offset;
	private int size;
	private int total;

	private List<T> data;

	private List<T> requestedData;

	public Result() {
	}

	public Result(int offset, int size) {
		this(null, offset, size);
	}

	public Result(List<T> data, int offset, int size) {
		this.data = data;
		this.offset = offset;
		this.size = size;
	}

	public boolean isFirst() {
		return offset == 0;
	}

	public boolean isLast() {
		return !hasNext();
	}

	public boolean hasNext() {
		if (data == null || size < 0) {
			return false;
		}
		return data.size() > size;
	}

	public int getTotalPage() {
		if (size < 0)
			return 1;

		return total % size == 0 ? total / size : total / size + 1;
	}

	public int getPage() {
		return offset / size + 1;
	}

	public void setData(List<T> data) {
		this.data = data;
		this.requestedData = null;
	}

	public List<T> getData() {
		if (requestedData == null) {
			if (size < 0 || data.size() <= size) {
				requestedData = data;
			} else {
				requestedData = data.subList(0, size);
			}
		}
		return requestedData;
	}

	public List<T> getOriginalData() {
		return data;
	}

	public Iterator<T> iterator() {
		return getData().iterator();
	}

	public int getOffset() {
		return offset;
	}

	public void setOffset(int offset) {
		this.offset = offset;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

}