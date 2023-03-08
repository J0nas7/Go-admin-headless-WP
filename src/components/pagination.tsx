// Internal
import { usePagination, DOTS } from './'

export const Pagination = ({
    onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className
} : {
    onPageChange: Function,
    totalCount: number,
    siblingCount?: number,
    currentPage: number,
    pageSize: number,
    className : string
}) => {
    const paginationRange : any = usePagination({
        totalCount : totalCount,
        pageSize : pageSize,
        siblingCount : siblingCount,
        currentPage : currentPage
      })
    
      if (currentPage === 0 || paginationRange.length < 2) {
        return null
      }

      const goPrevious = () => {
        onPageChange(currentPage - 1)
      }

      const goNext = () => {
        onPageChange(currentPage + 1)
      }

      let lastPage = paginationRange[paginationRange.length - 1]

      return (
        <ul className={`${className} pagination-list`}>
            <li onClick={goPrevious} className={`pagination-item${currentPage === 1 ? ' disabled' : ''}`}>
                &laquo;
            </li>

            {
                // Pagination logic start
                paginationRange.map((pageNumber: any, key: string) => {
                    if (pageNumber === DOTS) {
                        return <li className="pagination-item dots" key={key}>&#8230;</li>
                    }

                    return (
                        <li 
                            className={`pagination-item${pageNumber === currentPage ? ' selected' : ''}`}
                            onClick={() => onPageChange(pageNumber)}
                            key={key}
                        >
                            {pageNumber}
                        </li>
                    )
                })
                // Pagination logic end
            }

            <li onClick={goNext} className={`pagination-item${currentPage === lastPage ? ' disabled' : ''}`}>
                &raquo;
            </li>
        </ul>
      )
}