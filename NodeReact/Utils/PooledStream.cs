using System;
using Microsoft.IO;

namespace NodeReact.Utils;

internal class PooledStream : IDisposable
{
    private readonly RecyclableMemoryStream _stream;

    private static readonly RecyclableMemoryStreamManager _manager;
    
    static PooledStream()
    {
        var blockSize = 1024 * 128;
        var largeBufferMultiple = 1024 * 1024;
        var maximumBufferSize = 128 * 1024 * 1024;
        
        _manager = new RecyclableMemoryStreamManager(
            new RecyclableMemoryStreamManager.Options(
                blockSize,
                largeBufferMultiple,
                maximumBufferSize,
                largeBufferMultiple * 4,
                250 * blockSize)
        {
            GenerateCallStacks = true,
            AggressiveBufferReturn = true,
        });
    }

    public PooledStream()
    {
        _stream = _manager.GetStream() as RecyclableMemoryStream;
    }
    
    public RecyclableMemoryStream Stream => _stream;

    public void Dispose()
    {
        _stream.Dispose();
    }
}