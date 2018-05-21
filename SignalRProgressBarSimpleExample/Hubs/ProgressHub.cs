using System.Threading;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace SignalRProgressBarSimpleExample.Hubs
{
    [HubName("progress")]
    public class ProgressHub : Hub
    {
        public void LongRunningProcess(int itemsCount)
        {
            for (var i = 0; i <= itemsCount; i++)
            {
                //SIMULATING SOME TASK
                Thread.Sleep(300);

                var percentage = (i * 100) / itemsCount;

                Clients.All.addProgress(percentage);
            }
        }

        public void LongRunningProcessInReverse(int itemsCount)
        {
            for (var i = itemsCount; i >= 0; i--)
            {
                //SIMULATING SOME TASK
                Thread.Sleep(300);

                var percentage = (i * 100) / itemsCount;

                Clients.All.addProgress(percentage);
            }
        }
    }
}