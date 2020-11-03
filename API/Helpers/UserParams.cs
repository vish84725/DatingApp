namespace API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize{
            get 
            {
                return _pageSize;
            }
            set
            {
                if(value > MaxPageSize)
                {
                    _pageSize = MaxPageSize;
                }
                else
                {
                    _pageSize = value;
                }
            }
        }

        public string CurrentUsername { get; set; }
        public string Gender {get; set;}
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 150;
        public string OrderBy { get; set; } = "lastActive";

        
    }
}